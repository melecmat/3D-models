document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("control_trigger").addEventListener("click", trigger_menu);
    document.getElementById("change_visibility").addEventListener("change", change_popup_visibility);
    document.getElementById("switch_gyro").addEventListener("change", switch_gyroscope);
});

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

function change_popup_visibility() {
    var popups = document.getElementsByClassName("clickable");
    if (popups[0].getAttribute("visible") == false) {
        for (var i = 0; i < popups.length; ++i) {
            popups[i].setAttribute("visible", true);
        }
    } else {
        for (var i = 0; i < popups.length; ++i) {
            console.log(popups[i]);
            popups[i].setAttribute("visible", false);
        }
    }
}

function switch_gyroscope() {
    var camera = document.getElementById("camera");
    console.log("hello");
    console.log(camera.getAttribute("touch-controls"));
    var properties = camera.getAttribute("touch-controls");
    if (properties.gyroEnabled == true) {
        properties.gyroEnabled = false;
    } else {
       properties.gyroEnabled = true
    }
    camera.setAttribute("touch-controls", properties);
}