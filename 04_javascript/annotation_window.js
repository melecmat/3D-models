/**
 * Module used for creation of new annoattions and manipulation with them.
 */
var AnnotationWindow = (function () {
    var is_dirty = false; // value used for handling unsaved data

    // TODO -- move event listeners here
    /**
     * Puts all event listeners.
     */
    function put_listeners() {
        document.getElementById("save_change").addEventListener("click", save_changes);
        document.getElementById("discard_change").addEventListener("click", discard_changes);
        document.getElementById("reveal_server_v").addEventListener("click", get_version_from_web);
        document.getElementById("save_browser").addEventListener("click", save_to_local_storage);
        document.getElementById("save_button").addEventListener("click", save_json);
        document.getElementById("new_popup_button").addEventListener("click", create_new_popup);
    }

    /**
     * Functions called when editation mode is allowed and user presses ctrl + shift + e.
     * Enables buttons for editing
     */
    function make_edit_buttons_apear () {
        var edit_buttons = document.getElementsByClassName("ed_button");
        for (let button of edit_buttons) {
            make_edit_button_apear(button);
        }
    }

    /**
     * Provided with edit button node, makes this button visible
     * and also sets up its listeners.
     * Used when pressed ctrl + shift ? e but also when new annotation is created
     * by user.
     * @param {Node} button 
     */
    function make_edit_button_apear (button) {
        button.classList.add("visible");
            if(button.parentNode == document.getElementById("control_panel")) return;
            if (button.classList.contains("delete")) {
                button.addEventListener("click", function () {
                    // TODO -- change the way this is implemented -- get parent of the button!!!
                    delete_annotation(button); // slice gets the ID of annotation
                });
            } else 
                button.addEventListener("click", function () {
                    build_annotation_window(button); // slice gets the ID of annotation
                });
    }

    /**
     * Function to prevent data deletion
     */
    function prevent_data_deletion () {
        window.onbeforeunload = function () {
            if (!is_dirty) { // no chang assumed
                return undefined;
            }
            var confirmation_message = "";
            return confirmation_message;
        };
    }

    /**
     * Upon trumbowyg editor creation. Contains functions neded for trumbowyg.
     * Sets up the editor and adds event listeners to editor buttons.
     */
    var Editor = (function() {
        function init_editor () {
            $('#editor').trumbowyg({
                btns: [
                    ['viewHTML'],
                    ['undo', 'redo'], // Only supported in Blink browsers
                    ['formatting'],
                    ['strong', 'em', 'del'],
                    ['fontfamily'],
                    ['fontsize'],
                    ['foreColor', 'backColor'],
                    ['superscript', 'subscript'],
                    ['link'],
                    ['insertImage'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ['unorderedList', 'orderedList'],
                    ['horizontalRule'],
                    ['removeformat'],
                    ['fullscreen'],
                ],
                plugins: {
                    allowTagsFromPaste: {
                        allowedTags: ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'br', 'strong', 'em', 'del']
                    }
                }
            });

            // buttons EVENT LISTENERS
            document.addEventListener("template_done", function () {
                document.getElementById("copy_html").addEventListener("click", copy_html);
                document.getElementById("paste_html").addEventListener("click", paste_html);
            });
        }

        /**
         * Reads text from clipboard and puts it into trumbowyg
         */
        function paste_html() {
            navigator.clipboard.readText()
            .then(text => {
                append_html(text);
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
        }

        /**
         * Gets HTML contained in trumbowyg editor and puts it into clipboar.
         */
        function copy_html() {
            var htm = $('#editor').trumbowyg('html');
            htm = htm.replace(/\r?\n|\r/g, " ");
            // for copying text into clipboard
            const el = document.createElement('textarea');
            el.value = htm;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }

        /**
         * Puts given html into trumbowyg editor.
         * @param {string} html_to_append 
         */
        function append_html(html_to_append) {
            var html = $('#editor').trumbowyg('html');
            html += html_to_append;
            $('#editor').trumbowyg('html', html);
        }

        return {
            init_editor: init_editor,
            append_html: append_html
        };

    })();

    /**
     * Assembles annotation window and makes it visible.
     * @param {object} annotation_object 
     * @param {Node} button
     */
    function build_annotation_window(button, annotation_id = null/*annotation_id, annotation_info*/) {
        // put data into annotation window
        //var annotation_info = json_obj.annotations[annotation_id];
        is_dirty = true; // something is hapenning -- better note the changes
        var annotation_info = {};
        if (button != null) { // if creating new annotation
            // get information from buttons parent
            annotation_id = button.parentNode.id;
            annotation_info = json_obj.annotations[annotation_id];
        }
        
        try {
            document.getElementById("position_inp").value = get_entity_position_string(
                document.getElementById("rendered" + annotation_id), false
                )
        } catch(e) {}
        document.getElementById("no_inp").value = get_number_from_string(annotation_id);
        if (annotation_info.heading == undefined) annotation_info.heading = "";
        if (annotation_info.text == undefined) annotation_info.text = "";
        document.getElementById("heading_inp").value = annotation_info.heading;
        document.getElementById("current_edited").innerHTML = annotation_id;
        open_popup("annotation_window", false);
        // put into editor
        Editor.append_html(annotation_info.text);
    }

    /**
     * Deletes annotation -- parameter is the delete button node
     * and will remove its parent annotation.
     * @param {Node} button to delete
     */
    function delete_annotation(button) {
        // really?
        if (!confirm("Opravdu chcete smazat anotaci?")) return;
        var annotation_id = button.parentNode.id;
        var annotation_button = document.getElementById("rendered" + annotation_id);
        var annotation = document.getElementById(annotation_id);
        annotation_button.parentNode.removeChild(annotation_button);
        annotation.parentNode.removeChild(annotation);
        delete json_obj.annotations[annotation_id];
        // save to local storage
        save_to_local_storage();
    }

    /**
     * Saves information into user browsers local storage.
     */
    function save_to_local_storage() {
        var error_msg = "Couldnt save to local storage, something went wrong";
        try {
            console.log("should save");
            // get where to save to
            var key = get_local_location();
            if (key == null) {
                console.log(error_msg);
                return; // cannot save
            }
            window.localStorage.setItem(key, JSON.stringify(json_obj));
        } catch (e) {
            console.log(error_msg);
        }
        is_dirty = false;
    }

    /**
     * Gets location of local storage
     */
    function get_local_location() {
        var addr = location.search.slice(1, location.search.length);
        if (addr == "") {
            if ((addr = json_obj.path_name) == undefined) {
                console.log("Couldnt get local storage");
                return null;
            }
        }
        return addr;
    }

    /**
     * Small helper function
     * @param {*} string 
     */
    function get_number_from_string(string) {
        var r = /\d+/;
        return string.match(r);
    }

    /**
     * Easy input checking function for annotation form
     * @param {*} new_position 
     * @param {*} input_number 
     */
    function check_if_valid(new_position, input_number) {
        function color_input_red(input_node) {
            input_node.classList.add("wrong_input");
            input_node.addEventListener("focus", function () {
                input_node.classList.remove("wrong_input");
            });
        }

        if (!(cond1 = new_position.split(" ").length == 3)) {
            // wrong position
            color_input_red(document.getElementById("position_inp"));
        }
        if (!(cond2 = Number.isInteger(input_number))) {
            // is not number
            color_input_red(document.getElementById("no_inp"));
        }
        return cond1 && cond2;
    }

    /**
     * Writes changes into json_obj after closing the annotation window.
     */
    function save_changes() {
        var current_annotation = document.getElementById("current_edited").innerHTML;
        var new_position = document.getElementById("position_inp").value;
        var new_number = document.getElementById("no_inp").value;
        new_number = parseInt(new_number);
        //console.log(current_annotation);
        if (!check_if_valid(new_position, new_number)) {
            // write msg
            return;
        }
        // number change handling
        var new_id = "uniqueID" + new_number;
        // if new annotation
        var rendered_anno = document.getElementById("rendered" + current_annotation);
        if (rendered_anno == null) {
            // make it with id number_annotations + 1
            current_annotation = "uniqueID" + find_empty_id();
            make_new_annotation(new_position, current_annotation);
            // if that is the number we wanted -- were done
            if (current_annotation == new_id) {
                $('#editor').trumbowyg('empty');
                close_windows();
                save_to_local_storage();
                return;
            }
            // else -- continue executing
        }
        
        if (new_id in json_obj.annotations) {
            if (new_id != current_annotation) {
                // SWAP
                json_obj.annotations[current_annotation] = JSON.parse(JSON.stringify(json_obj.annotations[new_id])); // doing deep copy
                change_popup(current_annotation, json_obj.annotations[new_id]);
                current_annotation = new_id;
            }
        } else {
            delete json_obj.annotations[current_annotation];
            var rendered_annot = document.getElementById("rendered" + current_annotation);
            
            // just putting new number
            rendered_annot.setAttribute("id", "rendered"+new_id);
            rendered_annot.setAttribute("info-window", {window_id: new_id});
            rendered_annot.setAttribute("value", new_number + ".");
            document.getElementById(current_annotation).setAttribute("id", new_id);
            try {
                document.getElementById("edit" + current_annotation).setAttribute("id", "edit" + new_id);
            } catch (e) {}
            json_obj.annotations[new_id] = {};
            current_annotation = new_id;
        }
        //}

        json_obj.annotations[current_annotation].heading = document.getElementById("heading_inp").value;
        json_obj.annotations[current_annotation].text = $('#editor').trumbowyg('html');
        json_obj.annotations[current_annotation].position = new_position;
        // manipulate actual annotation
        change_popup(current_annotation, json_obj.annotations[current_annotation]);
        //$('#editor').trumbowyg('html', '');
        $('#editor').trumbowyg('empty');

        // save into local storage
        save_to_local_storage();

        close_windows();
    }

    /**
     * For building brand new annotation
     * @param {*} new_position 
     * @param {*} new_id 
     */
    function make_new_annotation(new_position, new_id) {
        var template_info = {
            "edit_mode" : true,
            "annotations" : {
                [new_id] : {
                    "heading" : document.getElementById("heading_inp").value,
                    "text" : $('#editor').trumbowyg('html'),
                    "position" : new_position,
                }
            }
        }
        App.put_template_to_html(template_info, "a-scene", Handlebars.templates.popup_button);
        App.put_template_to_html(template_info, "body", Handlebars.templates.popup);
        json_obj.annotations[new_id] = template_info.annotations[new_id];
        /*document.arrive("#delete" + new_id, function() {
            // 'this' refers to the newly created element
            console.log("HELLO form the other side");
            this.classList.add("visible");
        });
        document.arrive("#edit" + new_id, function() {
            this.classList.add("visible");
        });*/

        make_edit_button_apear(document.getElementById("delete" + new_id));
        make_edit_button_apear(document.getElementById("edit" + new_id));
    }


    /**
     * Makes the changes in the actual popup
     * @param {string} popup_id 
     * @param {object} annotation_info data
     */
    function change_popup(popup_id, annotation_info) {
        document.querySelector("#" + popup_id + " span.heading_span").innerHTML = annotation_info.heading;
        document.querySelector("#" + popup_id + " span.popup_text").innerHTML = annotation_info.text;
        document.getElementById("rendered" + popup_id).setAttribute("position", annotation_info.position);
    }

    /**
     * Fires up annotation window for creating new popup
     */
    function create_new_popup() {
        var id = find_empty_id();
        build_annotation_window(null, "uniqueID" + id);
    }

    /**
     * Finds empty id for new popup window.
     */
    function find_empty_id() {
        var id = document.getElementsByClassName("clickable").length + 1;
        // non elegant solution to find empty id :D
        while (document.getElementById("uniqueID" + id) != null) {
            ++id;
        }
        return id;
    }

    /**
     * Discards changes and closes the annotation window.
     */
    function discard_changes() {
        if (!confirm("Opravdu chcete zahodit změny?")) return;
        $('#editor').trumbowyg('empty');
        close_windows();
    }

    /**
     * Function that lets user save json_obj into a json file on his device
     */
    function save_json() {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(json_obj)], {type: "text/json"});
        a.href = URL.createObjectURL(file);
        a.download = "info.json";
        a.click();
        // save to local storage
        save_to_local_storage();
        is_dirty = false;
    }

    /**
     * Returns fresh version from the web, if user is working on his own from data storage
     */
    function get_version_from_web() {
        delete_old_data();
        load_from_web_or_user(get_local_location());
    }

    function delete_old_data() {
        var annotations = document.getElementsByClassName("popup");
        for (let popup of annotations) {
            popup.parentNode.removeChild(popup);
        }
        var a_scene = document.querySelector("a-scene");
        a_scene.parentNode.removeChild(a_scene);
    }

    return {

        /**
         * Main function -- takes care of initiating the whole editing capabilities.
         */
        init_annotation_editor : function () {
            var key_comb_pressed = false;
            App.put_template_to_html(json_obj, "body", Handlebars.templates.annotation_window);
            
            console.log("Edit mode allowed.");
            //  TODO -- put this as a template
            var extra_buttons = '<button class="ed_button button" id="new_popup_button">Vytvořit novou anotaci</button>\
            <button class="ed_button button" id="reveal_server_v">Načíst verzi ze serveru</button>\
            <button class="ed_button button" id="save_browser">Uložit do prohlížeče</button>\
            <button class="ed_button button" id="save_button">Uložit JSON soubor</button>';
            document.getElementById("control_panel").innerHTML += extra_buttons;
            Editor.init_editor();

            // catch ctrl + shift + e and turn on edit buttons
            document.addEventListener("keydown", function (zEvent) {
                if (zEvent.ctrlKey  &&  zEvent.shiftKey  &&  (zEvent.key === "e" || zEvent.key === "E")) {  // case sensitive
                    zEvent.preventDefault();
                    if (!key_comb_pressed){
                        key_comb_pressed = true;
                        make_edit_buttons_apear();
                        prevent_data_deletion();
                    }
                } else {}
            }, true);

            put_listeners();
        },
    };
})();