/**
 * My first component, it changes the sky
 */
AFRAME.registerComponent ('cursor-listener', {
    init: function() {
        this.el.addEventListener('click', function(event) {
            var sky = document.getElementById("sky");
            if (sky.getAttribute('src') == "#home") {
                sky.setAttribute('src', '#everest');
            } else {
                sky.setAttribute('src', '#home');
            }
        });
    }
});

/**
 * this component is used to change camera position, allowing for movement around the world
 * syntax in HTML: <a-sth change-position=' position : x y z' > </a-sth>
 * when the position atttribute is left out, the camera position will be changed to that of element
 */

AFRAME.registerComponent ('change-position', {
    schema: {
        position: {type: 'string', default: ''}
    },
    init: function() {
        var data = this.data;
        var el = this.el;
        position = el.getAttribute('position');
        this.el.addEventListener('click', function(event) {
            var camera = document.getElementById('camera');
            if (data.position != "") {
                camera.setAttribute('position', data.position);
            } else { // action when no coordinates provided
                camera.setAttribute('position', el.getAttribute('position'));
            }
        });
        this.el.addEventListener('mouseenter', function() {
            console.log(el.getAttribute('position'));
        })
    }
});

/** 
 * clickable component for popup window
*/
AFRAME.registerComponent ('info-window', {
    schema: {
        window_id: {type: 'string', default: ''}
    },
    init: function() {
        var window_id = this.data.window_id;
        this.el.addEventListener('click', function() {
            document.getElementById(window_id).classList.add("visible");
        });
    }
});