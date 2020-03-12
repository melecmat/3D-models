/* MAIN HANDLEBAR CODE */
// custom helpers
Handlebars.registerHelper("get_number", function (id) {
    var regex = /\d+/;
    return id.match(regex) + ".";
});

Handlebars.registerHelper('if_equals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("increment", function(num) {
    return ++num;
});

// get json file
var oReq = new XMLHttpRequest();
/** Global variable */
var json_obj;
oReq.onload = function () {
    json_obj = JSON.parse(this.responseText);
    // title
    document.querySelector("title").innerHTML = json_obj.title;
    document.getElementById("heading").innerHTML = json_obj.title;

    // orbit controls -- get rid of redundant stuff
    if (json_obj.player.orbit_control == true) {
        console.log("orbit controls: " + json_obj.player.orbit_control);
        document.getElementById("control_panel").classList.add("orbit_control");
        document.addEventListener("joystick-created", function() {
            document.getElementById("joystick").classList.add("invisible");
        });
    }
    // multiple model selection
    if (json_obj.player.model_src == "") {
        put_template_to_html(json_obj.player, "#loading_screen", Handlebars.templates.model_choice);
    }
    // 3d player
    put_template_to_html(json_obj.player, "body", Handlebars.templates.player);
    
    // annotations
    put_template_to_html(json_obj, "a-scene", Handlebars.templates.popup_button);
    put_template_to_html(json_obj, "body", Handlebars.templates.popup);
    // gallery
    for (const gallery of json_obj.galleries) {
        build_gallery(gallery);
    }
    //var camera = document.getElementById("camera");
    //camera.setAttribute('camera', 'active', true);
    
    // check for edit mode
    if(json_obj.edit_mode) {
        var key_comb_pressed = false;
        put_template_to_html(json_obj, "body", Handlebars.templates.annotation_window);
        document.addEventListener("template_done", function() {
            init_editor();
        });
        document.addEventListener ("keydown", function (zEvent) {
            if (zEvent.ctrlKey  &&  zEvent.altKey  &&  (zEvent.key === "e" || zEvent.key === "E")) {  // case sensitive
                console.log("ctrl alt e pressed");
                if (!key_comb_pressed){
                    key_comb_pressed = true;
                    make_edit_buttons_apear();
                }
            }
        });
    }

    var done_event = new Event("template_done");
    document.dispatchEvent(done_event);
};
oReq.onerror = function () { console.log('Fetch Error', err); };
var addr = location.search.slice(1, location.search.length);
var loading_style = "<style type='text/css'> #loading_screen {background-image:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('"+ addr +"/background.jpg');background-position:center;background-size: cover;} </style>"
document.querySelector("body").innerHTML += loading_style;
oReq.open('get',  addr + "/info.json", true);
oReq.send();

/**
 * @param {*} data_obj 
 * @param {*} parent_selector 
 * @param {function} compiled_template
 */
function put_template_to_html(data_obj, parent_selector, compiled_template) {
    try {
        var html = compiled_template(data_obj);
        var parent = document.querySelector(parent_selector);
        parent.innerHTML += html;
    } catch (TypeError) {console.log("Element doesnt exist.")} // to take care for missing galleries
    
}

function make_edit_buttons_apear() {
    var edit_buttons = document.getElementsByClassName("ed_button");
    for (let button of edit_buttons) {
        button.classList.add("visible");
        console.log("visible");
        button.addEventListener("click", function () {
            edit_annotation(button.id.slice(4)); // slice gets the ID of annotation
        });
    }
}