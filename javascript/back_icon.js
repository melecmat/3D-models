// get cameras default position
var camera = document.getElementById("camera");
var homeButton = document.getElementById("home_button");
homeButton.addEventListener("click", function() {
    var default_pos = camera.getAttribute("position");
    default_pos.x = 0;
    default_pos.y = 0;
    default_pos.z = 0;
    console.log("returning home");
    console.log(default_pos);
    camera.setAttribute("position", default_pos);
});