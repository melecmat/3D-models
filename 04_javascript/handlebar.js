/* MAIN HANDLEBAR CODE */
/* Code that takes care of putting the application together */

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

//document.addEventListener("DOMContentLoaded", function() {
    // getting json file using XMLHttpRequest
    var oReq = new XMLHttpRequest();
    /** Global variable */
    var json_obj;
    oReq.addEventListener("load", main_templating);
    oReq.onerror = function () { console.log('Fetch Error', err); };
    var addr = location.search.slice(1, location.search.length);
    // loading custom json file
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
//});

/**
 * Main function that puts together templates based on the json parameters. 
 * Should be called either with json object or from response asking for the json file. 
 * @param {*} e event
 * @param {object} custom_json object containing information about player 
 * -- if left out will try to parse response text from request.
 */
function main_templating(e, custom_json, only_player = false) {
    //const lbd = function() {
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
        
        // check for edit mode
        if(json_obj.edit_mode) {
            var key_comb_pressed = false;
            put_template_to_html(json_obj, "body", Handlebars.templates.annotation_window);
            
            console.log("Edit mode allowed.");
            var extra_buttons = '<button class="ed_button button" id="new_popup_button" onclick="create_new_popup()">Vytvořit novou anotaci</button>\
            <button class="ed_button button" id="save_button" onclick="save_json()">Uložit JSON soubor</button>';
            document.getElementById("control_panel").innerHTML += extra_buttons;
            init_editor();

            // catch ctrl + shift + e and turn on edit buttons
            document.addEventListener("keydown", function (zEvent) {
                if (zEvent.ctrlKey  &&  zEvent.shiftKey  &&  (zEvent.key === "e" || zEvent.key === "E")) {  // case sensitive
                    zEvent.preventDefault();
                    if (!key_comb_pressed){
                        key_comb_pressed = true;
                        make_edit_buttons_apear();
                    }
                } else {}
            }, true);
        }

        // templating done
        var done_event = new Event("template_done");
        document.dispatchEvent(done_event);
    //}

    
}

/**
 * Function used to load json uploaded by user using form
 */
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
 * Helper function to put data into Handlebars template
 * @param {Object} data_obj 
 * @param {string} parent_selector 
 * @param {function} compiled_template in form Handlebars.templates.template_filename_without_extension
 */
function put_template_to_html(data_obj, parent_selector, compiled_template) {
    try {
        var html = compiled_template(data_obj);
        var parent = document.querySelector(parent_selector);
        var new_els = create_element_fromHTML(html);
        for (var el of new_els) {
            parent.appendChild(el);
        }
    } catch (TypeError) {
        console.log("Element "+ parent_selector +" doesnt exist.");
    } // to take care for missing galleries
}

/**
 * Creates html node from html
 * @param {string} htmlString 
 */
function create_element_fromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString;
  
    // Change this to div.childNodes to support multiple top-level nodes
    return div.childNodes; 
  }