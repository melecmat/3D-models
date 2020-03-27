/**
 * Functions called when editation mode is allowed and user presses ctrl + alt + e.
 * Enables buttons for editing
 */
function make_edit_buttons_apear() {
    var edit_buttons = document.getElementsByClassName("ed_button");
    for (let button of edit_buttons) {
        button.classList.add("visible");
        if(button.parentNode == document.getElementById("control_panel")) continue;
        button.addEventListener("click", function () {
            build_annotation_window(button.id.slice(4), json_obj.annotations[button.id.slice(4)]); // slice gets the ID of annotation
        });
    }
}

/**
 * Assembles annotation window and makes it visible.
 * @param {object} annotation_object 
 */
function build_annotation_window(annotation_id, annotation_info) {
    // put data into annotation window
    //var annotation_info = json_obj.annotations[annotation_id];
    try {
        document.getElementById("position_inp").setAttribute(
            "value", get_entity_position_string(document.getElementById("rendered" + annotation_id), false)
        );
    } catch(e) {}
    document.getElementById("no_inp").setAttribute("value", get_number_from_string(annotation_id));
    document.getElementById("heading_inp").setAttribute("value", annotation_info.heading);
    document.getElementById("current_edited").innerHTML = annotation_id;
    open_popup("annotation_window", false);
    // put into editor
    append_html(annotation_info.text);
}

function get_number_from_string(string) {
    var r = /\d+/;
    return string.match(r);
}

/** FOR EDITOR */

/**
 * Upon trumbowyg editor creation.
 * Sets up the editor and adds event listeners to editor buttons.
 */
function init_editor() {
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
 * Easy input checking function for annotation form
 * @param {*} new_position 
 * @param {*} input_number 
 */
function check_if_valid(new_position, input_number) {
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

function color_input_red(input_node) {
    input_node.classList.add("wrong_input");
    input_node.addEventListener("focus", function () {
        input_node.classList.remove("wrong_input");
    });
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
    //if (new_id != current_annotation) {
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
        // if I have new annotation
        if (rendered_annot == null) {
            // TODO -- new annotation
            make_new_annotation(new_position, new_id);
            $('#editor').trumbowyg('empty');
            close_windows();
            return;
        } else {
            // just putting new number
            rendered_annot.setAttribute("id", "rendered"+new_id);
            rendered_annot.setAttribute("info-window", {window_id: new_id});
            rendered_annot.setAttribute("value", new_number + ".");
            document.getElementById(current_annotation).setAttribute("id", new_id); 
            document.getElementById("edit" + current_annotation).setAttribute("id", "edit" + new_id);
            json_obj.annotations[new_id] = {};
            current_annotation = new_id;
        }
    }
    //}

    json_obj.annotations[current_annotation].heading = document.getElementById("heading_inp").value;
    json_obj.annotations[current_annotation].text = $('#editor').trumbowyg('html');
    json_obj.annotations[current_annotation].position = new_position;
    // manipulate actual annotation
    change_popup(current_annotation, json_obj.annotations[current_annotation]);
    //$('#editor').trumbowyg('html', '');
    $('#editor').trumbowyg('empty');

    close_windows();
}

/**
 * For building brand new annotation
 * @param {*} new_position 
 * @param {*} new_id 
 */
function make_new_annotation(new_position, new_id) {
    var template_info = {
        "annotations" : {
            [new_id] : {
                "heading" : document.getElementById("heading_inp").value,
                "text" : $('#editor').trumbowyg('html'),
                "position" : new_position,
            }
        }
    }
    //put_template_to_html(template_info, "a-scene", Handlebars.templates.popup_button);
    put_template_to_html(template_info, "body", Handlebars.templates.popup);
    create_popup(new_id, new_position, false);
    //console.log("#"+new_id+" .back_icon");
    //document.querySelector("#"+new_id+" .back_icon").addEventListener('click', close_windows);
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

function create_new_popup() {
    var id = document.getElementsByClassName("clickable").length + 1;
    // non elegant solution :D
    while (document.getElementById("uniqueID" + id) != null) {
        ++id;
    }
    build_annotation_window("uniqueID" + id, {});
}

/**
 * Discards changes and closest the annotation window.
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
}