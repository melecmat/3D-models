if (AFRAME.utils.device.isMobile ()) {
    var camera = document.getElementById("camera");
    camera.removeAttribute("look-controls");
    camera.setAttribute("touch-controls");
}