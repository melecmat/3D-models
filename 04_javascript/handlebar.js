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
oReq.addEventListener("load", main_templating);
oReq.onerror = function () { console.log('Fetch Error', err); };
var addr = location.search.slice(1, location.search.length);
if (addr == "") {
    // load custom json
    document.querySelector("body").innerHTML += '<form name="form_input" enctype="multipart/form-data">\
    <input type="file" name="uploaded_json" id="file" />\
    <button type="button" onclick="load_json()">Nahrajte upravený JSON soubor</button>\
    </form>'
} else {
    var loading_style = "<style type='text/css'> #loading_screen {background-image:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('"+ addr +"/background.jpg');background-position:center;background-size: cover;} </style>"
    document.querySelector("body").innerHTML += loading_style;
    oReq.open('get',  addr + "/info.json", true);
    oReq.send();
}


function main_templating(e, custom_json) {
    console.log("custom_json " + custom_json);
    if (custom_json != undefined) {
        json_obj = custom_json;
    } else {
        json_obj = JSON.parse(this.responseText);
    }
    
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
        
        console.log("Edit mode allowed.");
        document.addEventListener("template_done", function() {
            var save_button = '<button class="ed_button button" id="save_button" onclick="save_json()">Uložit JSON soubor</button>'
            document.getElementById("control_panel").innerHTML += save_button;
            init_editor();
        });
        document.addEventListener ("keydown", function (zEvent) {
            if (zEvent.ctrlKey  &&  zEvent.altKey  &&  (zEvent.key === "e" || zEvent.key === "E")) {  // case sensitive
                console.log("ctrl alt e pressed");
                if (!key_comb_pressed){
                    key_comb_pressed = true;
                    make_edit_buttons_apear();
                }
            } else {}
        }, true);
    }

    var done_event = new Event("template_done");
    document.dispatchEvent(done_event);
}

function load_json() {
    var file = document.getElementById('file');
    
    if(file.files.length) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            //document.getElementById('outputDiv').innerHTML = e.target.result;
            main_templating(null, JSON.parse(e.target.result));
        };
        
        reader.readAsText(file.files[0]);
    }
}
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