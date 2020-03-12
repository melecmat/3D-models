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


