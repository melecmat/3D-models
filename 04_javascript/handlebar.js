/* MAIN HANDLEBAR CODE */
// custom helpers
Handlebars.registerHelper("get_number", function (id) {
    var regex = /\d+/;
    return id.match(regex) + ".";
});

// get json file
var oReq = new XMLHttpRequest();
oReq.onload = function () {
    var json_obj = JSON.parse(this.responseText);
    // title
    document.querySelector("title").innerHTML = json_obj.title;
    document.getElementById("heading").innerHTML = json_obj.title;

    // orbit controls -- get rid of redundant stuff
    if (json_obj.player.orbit_control == true) {
        console.log("orbit controls: " + json_obj.player.orbit_control);
        //document.addEventListener("DOMContentLoaded", function () {
            document.getElementById("control_panel").classList.add("orbit_control");
        //});
    }
    // 3d player
    put_template_to_html(json_obj.player, "body", Handlebars.templates.player);
    
    // annotations
    put_template_to_html(json_obj, "a-scene", Handlebars.templates.popup_button);
    put_template_to_html(json_obj, "body", Handlebars.templates.popup);
    // gallery
    for (const gallery of json_obj.galleries) {
        put_template_to_html(gallery, "#"+gallery.parent_id + " .popup_body", Handlebars.templates.gallery);
        create_gallery(gallery.parent_id, gallery.json_gallery_src, gallery.has_full_size_version);
    }
    //var camera = document.getElementById("camera");
    //camera.setAttribute('camera', 'active', true);
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
    var html = compiled_template(data_obj);
    var parent = document.querySelector(parent_selector);
    parent.innerHTML += html;
}