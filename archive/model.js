AFRAME.registerComponent ('switch-camera-mode', {
    init: function() {
        this.el.addEventListener('click', function(event) {
            var camera = document.getElementById("camera");
            var model = document.getElementById("model");
            if (model.getAttribute('visible') == "false") {
                model.setAttribute('visile', 'true');
                camera.setAttribute('orbit-controls', 'target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 0 3 3');
            } else {
                model.setAttribute('visible', 'false');
                camera.setAttribute('orbit-controls', '');
            }
        });
    }
});