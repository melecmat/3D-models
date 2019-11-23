// event listeners for reading values of the control panel
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("control_trigger").addEventListener("click", trigger_menu);
    document.getElementById("change_visibility").addEventListener("change", change_popup_visibility);
    document.getElementById("switch_gyro").addEventListener("change", switch_gyroscope);
    //document.getElementById(); TODO -- change velocity
});

/**
 * Function for menu sliding
 */
function trigger_menu() {
    var trigger = document.getElementById("control_trigger");
    var panel = document.getElementById("control_panel");
    if (panel.classList.contains("triggered")) {
        trigger.classList.remove("triggered");
        panel.classList.remove("triggered");
        trigger.setAttribute("src", "../../control_graphic/right.png");
    } else {
        trigger.classList.add("triggered");
        panel.classList.add("triggered");
        trigger.setAttribute("src", "../../control_graphic/back_icon.png");
    }
}

/**
 * Implements the functionality of making descriptions in A-Frame invisible/visible
 */
function change_popup_visibility() {
    var popups = document.getElementsByClassName("clickable");
    if (popups[0].getAttribute("visible") == false) {
        for (var i = 0; i < popups.length; ++i) {
            popups[i].setAttribute("visible", true);
        }
    } else {
        for (var i = 0; i < popups.length; ++i) {
            popups[i].setAttribute("visible", false);
        }
    }
}

function switch_gyroscope() {
    var camera = document.getElementById("camera");
    var properties = camera.getAttribute("touch-controls");
    if (properties.gyroEnabled == true) {
        properties.gyroEnabled = false;
    } else {
       properties.gyroEnabled = true
    }
    camera.setAttribute("touch-controls", properties);
}

/**
 * For changing the velocity of camera.
 * Should be listening to change of speed slider
 */
function change_acceleration(input) {
    var acceleration = input.value;
    document.getElementById("speed_val").innerHTML = acceleration;
    var camera = document.getElementById("camera");
    //var acceleration = camera.getAttribute("wasd-controls");
    //acceleration = parseInt(acceleration.match(/\d+/)[0] );
    //acceleration += delta;
    camera.setAttribute("wasd-controls", " fly:true; acceleration:" + acceleration);
}