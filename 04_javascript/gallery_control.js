/* MAIN */
document.addEventListener("DOMContentLoaded", function () {

    // listen for click of gallery button
    // to the right click
    var buttons = document.getElementsByClassName("gal_right_click");
    for (var i = 0; i < buttons.length; ++i) {
        buttons[i].addEventListener("click", right_click, false);
    }
    // to the left
    var buttons = document.getElementsByClassName("gal_left_click");
    for (var i = 0; i < buttons.length; ++i) {
        buttons[i].addEventListener("click", left_click, false);
    }

    // listen for buttons swipes (hammer.js) etc --  TODO after the whole gallery is working

    var enlarge_icons = document.getElementsByClassName("enlarge_icon");
    
    for (var i = 0; i < enlarge_icons.length; ++i) {
        enlarge_icons[i].addEventListener("click", enlarge);
    }
});


/**
 * Creates gallery. It takes care of creating HTML representation of it, loading json, setting everything up.
 * Note: the gallery representation in A-Frame is done by create_popup() function -- below
 * @param {*} gal_id
 * @param {*} json_gallery_src 
 */
function create_gallery(gal_id, json_gallery_src) {
    var oReq = new XMLHttpRequest();
    oReq.onload = function () { // successfully gotten the images
        var images = JSON.parse(this.responseText);
        let i = 0;
        let gal_count = 0; // do not know if correct
        var main_gal_div = document.getElementById("gal_wrapper" + gal_id);
        for (var src in images) {
            ++gal_count;
            // make div wrapping the image -- should be numbered - variable for incrementing
            var wrap_div = document.createElement("div");

            // number will be in format 001 010 100 etc.
            prepend = calc_prepend(i);
            wrap_div.setAttribute("id", "gal_wrapper" + gal_id + prepend + i); // numbered id
            wrap_div.setAttribute("class", "image_wrapper");
            // make image with lazy loading stuff
            var image = document.createElement("img");
            image.setAttribute("lazy-src", json_gallery_src + "/" +src);
            // make description
            var description = document.createElement("p");
            description.innerHTML = images[src];
            // append wrapping div to main wrapping div, append image and description to it
            wrap_div.appendChild(image);
            wrap_div.appendChild(description);
            main_gal_div.appendChild(wrap_div);
            // lazy loading itself handled in right click function
            ++i;
        }
        // set gallery counter
        let count_vis = document.getElementById("g_num" + gal_id);
        count_vis.querySelector('.total').innerHTML = "/" + gal_count;
    };
    oReq.onerror = function () { console.log('Fetch Error', err); };
    oReq.open('get', json_gallery_src + '/dir_list.json', true);
    oReq.send();
}

/**
 * Initialises the gallery when user clicks on button in Aframe.
 * If you intend to use the gallery on its own you have to call this function manually
 * @param {*} gallery_wrapper 
 */
function init_gallery(gallery_wrapper) {
    // WHAT I CALL IMG ARE ACTUALLY WRAPPERS OF IMG
    // load first two images
    var img_wrapper1 = document.getElementById(gallery_wrapper.id + "000");
    var img_wrapper2 = document.getElementById(gallery_wrapper.id + "001");
    
    set_src(img_wrapper1);
    set_src(img_wrapper2);
    // deactivate image before
    try {
        (document.getElementsByClassName("active_img"))[0].classList.remove("active_img");
    } catch (error) {}
    
    // add active class to the currently visible picture (number 0)
    img_wrapper1.classList.add("active_img");
    document.onkeydown = track_keys;

    // set counter to one
    gallery_wrapper.querySelector(".current_img").innerHTML = "1";
}

/**
 * For sliding images using arrows.
 * @param {*} event 
 */
function track_keys(event) {
    event.stopPropagation();
    switch (event.key) {
        case "ArrowLeft":
            left_click();
            break;
        case "ArrowRight":
            right_click();
            break;
    }
}

/**
 * Sets src to image and loads it
 * @param {*} img_wrapper 
 */
function set_src(img_wrapper) {
    var lazy_src = img_wrapper.children[0].getAttribute("lazy-src");
    img_wrapper.children[0].setAttribute("src", lazy_src);
}

/**
 * Takes care of sliding images and lazy loading new ones.
 * @param {Event} e 
 */
function right_click() {
    // get current active image
    var previous_active = document.getElementsByClassName("active_img")[0];
    var id = previous_active.id;
    var clean_id = id.slice(0, -3);
    var no_id = id.slice(-3, id.length);
    var no = parseInt(no_id, 10);
    // check if this is the last image
    if (document.getElementById(clean_id + int2prepString((++no))) == undefined) {
        return;
    }
    // chage, what is displayed on the image count
    previous_active.parentElement.querySelector(".current_img").innerHTML = no + 1;
    // set new active
    previous_active.classList.remove("active_img");
    document.getElementById(clean_id + int2prepString((no))).classList.add("active_img");
    // load new image if it exists
    if (document.getElementById(clean_id + int2prepString((++no))) == undefined) {
        return;
    }
    set_src(document.getElementById(clean_id + int2prepString((no))));
}

/**
 * The other way to right click
 */
function left_click() {
    // get current active image
    var previous_active = document.getElementsByClassName("active_img")[0];
    
    var id = previous_active.id;
    var clean_id = id.slice(0, -3);
    var no_id = id.slice(-3, id.length);
    var no = parseInt(no_id, 10);
    // set new active if exists
    if (document.getElementById(clean_id + int2prepString((--no))) == undefined) {
        return;
    }
    // chage, what is displayed on the image count
    previous_active.parentElement.querySelector(".current_img").innerHTML = no + 1;
    previous_active.classList.remove("active_img");
    document.getElementById(clean_id + int2prepString((no))).classList.add("active_img");
}

/**
 * Enlarges gallery
 */
function enlarge() {
    var galleries = document.getElementsByClassName("gallery_wrapper");
    for (var i = 0; i < galleries.length; ++i) {
        var popup = galleries[i].parentElement.parentElement;
        var icon = document.getElementsByClassName("enlarge_icon");
        if (popup.classList.contains("enlarged")) {
            popup.classList.remove("enlarged");
            // make icon small
            
            //for (var l = 0; l < icon.length; ++l)
            icon[i].src = "../../control_graphic/maximize.png";
        } else {
            popup.classList.add("enlarged");
            //for (var l = 0; l < icon.length; ++l)
            icon[i].src =  "../../control_graphic/minimize.png";
        }
    }
}

/* SMALL UTILITY FUNCTIONS */

/**
 * Simple function that determines how many zeroes to prepend before 
 * a number to get it in format: 001 010 100 etc.
 * @param {Integer} i 
 */
function calc_prepend(i) {
    if (i < 10) {
        return "00";
    } else if (i < 100) {
        return "0";
    }
    return "";
}
/**
 * Takes in integer and returns string in format 001 010 100
 * @param {Integer} i 
 * @returns String
 */
function int2prepString(i) {
    return calc_prepend(i) + i;
}

/**
 * Makes roman number out of an integer. I am using it for counting descriptions
 * @param {*} num 
 */
function romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}, roman = '', i;
    for ( i in lookup ) {
        while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman + ".";
}
