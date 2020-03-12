function make_edit_buttons_apear() {
    var edit_buttons = document.getElementsByClassName("ed_button");
    for (let button of edit_buttons) {
        button.classList.add("visible");
        //console.log("visible");
        if(button.parentNode == document.getElementById("control_panel")) continue;
        button.addEventListener("click", function () {
            edit_annotation(button.id.slice(4)); // slice gets the ID of annotation
        });
    }
}

function edit_annotation(annotation_id) {
    // assemble annotation window and make it visible
    build_annotation_window(annotation_id);
}

function build_annotation_window(annotation_id) {
    // put data into annotation window
    var annotation_info = json_obj.annotations[annotation_id];
    document.getElementById("position_inp").setAttribute(
            "value", get_entity_position_string(document.getElementById("rendered" + annotation_id), false)
        );
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
 * Upon editor creation
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
        // TODO -- add actions when ending
    });

}

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

function append_html(html_to_append) {
    var html = $('#editor').trumbowyg('html');
    html += html_to_append;
    $('#editor').trumbowyg('html', html);
}

function paste_html() {
    navigator.clipboard.readText()
    .then(text => {
        append_html(text);
    })
    .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
}

function check_if_valid(new_position, input_number) {
    return new_position.split(" ").length == 3 && Number.isInteger(input_number);
}

function save_changes() {
    // write changes into json_obj
    var current_annotation = document.getElementById("current_edited").innerHTML; // TODO -- SET THIS UP!!
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
    if (new_id != current_annotation) {
        if (new_id in json_obj.annotations) {
            // SWAP
            json_obj.annotations[current_annotation] = json_obj.annotations[new_id];
            change_popup(current_annotation, json_obj.annotations[new_id]);
            current_annotation = new_id; 
        } else {
            // just putting new number
            delete json_obj.annotations[current_annotation];
            var rendered_annot = document.getElementById("rendered" + current_annotation);
            rendered_annot.setAttribute("id", "rendered"+new_id);
            rendered_annot.setAttribute("info-window", {window_id: new_id});
            document.getElementById(current_annotation).setAttribute("id", new_id); // TODO -- new doesnt work yet
            
            console.log("new id " + new_id);
            current_annotation = new_id;
            json_obj.annotations[new_id] = {};
        }
    }

    json_obj.annotations[current_annotation].heading = document.getElementById("heading_inp").value;
    json_obj.annotations[current_annotation].text = $('#editor').trumbowyg('html');
    json_obj.annotations[current_annotation].position = new_position;
    // manipulate actual annotation
    change_popup(current_annotation, json_obj.annotations[current_annotation]);
    //$('#editor').trumbowyg('html', '');
    $('#editor').trumbowyg('empty');
    // swap IDS

    close_windows();
}

function change_popup(popup_id, annotation_info) {
    document.querySelector("#" + popup_id + " span.heading_span").innerHTML = annotation_info.heading;
    document.querySelector("#" + popup_id + " span.popup_text").innerHTML = annotation_info.text;
    document.getElementById("rendered" + popup_id).setAttribute("position", annotation_info.position);
}

function discard_changes() {
    if (!confirm("Opravdu chcete zahodit změny?")) return;
    $('#editor').trumbowyg('empty');
    close_windows();
}

function save_json() {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(json_obj)], {type: "text/json"});
    a.href = URL.createObjectURL(file);
    a.download = "info.json";
    a.click();
}