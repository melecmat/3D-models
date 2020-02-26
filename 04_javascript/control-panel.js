// event listeners for reading values of the control panel
document.addEventListener("template_done", function () {
    document.getElementById("control_trigger").addEventListener("click", trigger_menu);
    document.getElementById("change_visibility").addEventListener("change", change_popup_visibility);
    document.getElementById("switch_gyro").addEventListener("change", switch_gyroscope);
    //document.getElementById(); TODO -- change velocity
    document.getElementById("copy_pos").addEventListener("click", copy_position_rotation);
    document.getElementById("goto_pos").addEventListener("click", go_to_position);
    register_enter();
    register_help();
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


/**
 * Copies current camera position.
 * Will be in a listener.
 */
function copy_position_rotation() {
    var posrot = "";
    var camera = document.getElementById("camera");
    var pos = camera.getAttribute("position");
    var rot_x = camera.components['touch-controls'].pitchObject.rotation.x;
    var rot_y = camera.components['touch-controls'].yawObject.rotation.y;
    posrot = toFixedTruncate(pos.x, 3) + " " + toFixedTruncate(pos.y, 3) + " " + toFixedTruncate(pos.z, 3);
    posrot += " " + toFixedTruncate(rot_x, 3) + " " + toFixedTruncate(rot_y, 3);

    // for copying text into clipboard
    const el = document.createElement('textarea');
    el.value = posrot;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

/**
 * Helper function for cutting off too long floats.
 * Shortens them to precision and truncates trailing zeroes.
 * @param {*} no 
 * @param {*} precision 
 */
function toFixedTruncate(no, precision) {
    return parseFloat(no.toFixed(precision));
}

/**
 * Enables jump to position specified in a form field
 */
function go_to_position() {
    var camera = document.getElementById("camera");
    var posrot = document.getElementById("user_pos").value;
    var pos_array = posrot.split(" ");
    if (pos_array.length != 5) {
        // wrong input
        // TODO -- upon wrong input tell the user
        return;
    }
    var pos = camera.getAttribute("position");
    newX = parseFloat(pos_array[0]);
    newY = parseFloat(pos_array[1]);
    newZ = parseFloat(pos_array[2]);
    rotX = parseFloat(pos_array[3]);
    rotY = parseFloat(pos_array[4]);
    if (isNaN(newX) || isNaN(newY) || isNaN(newZ) || isNaN(rotX) || isNaN(rotY)) {
        // wrong input
        return;
    }
    pos.x = newX;
    pos.y = newY;
    pos.z = newZ;

    camera.components['touch-controls'].pitchObject.rotation.x = rotX;
    camera.components['touch-controls'].yawObject.rotation.y = rotY;
}

function register_enter() {
    var input = document.getElementById("user_pos");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("goto_pos").click();
    }
    });
}

function register_help() {
    var help_button = document.getElementById("help");
    help_button.addEventListener("click", function(e) {
        var help = document.getElementById("help_popup");
        if (help.classList.contains("visible")) help.classList.remove("visible");
        else help.classList.add("visible");
    });
}