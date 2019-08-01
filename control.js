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
            var desired_position;
            if (data.position != "") {
                desired_position = data.position;
                // to be deleted
                camera.setAttribute('position', data.position);
            } else { // action when no coordinates provided
                desired_position = el.getAttribute("position");
                camera.setAttribute('position', desired_position);
            }

            // TRYING ANIMATION TODO
            var animation = document.createElement("a-animation");
            animation.setAttribute("attribute","position");
            animation.setAttribute("to",desired_position);
            animation.setAttribute("dur","2000");
            animation.setAttribute("easing","linear");
            console.log("Animating");
            camera.appendChild(animation);


            /*EXPERIMENT
            actualPos = new Position(camera.getAttribute("position"));
            console.log("ahoj")
            desPos = new Position(desired_position);
            desPos.logout();
            console.log(desired_position);
            */
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

class Position {

    constructor(position) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        var floats = position.match(regex).map(function(v) { return parseFloat(v); });
        this.x = floats[0];
        this.y = floats[1];
        this.z = floats[2];
    }

    back_to_string() {
        return this.x.toString() + this.y.toString() + this.z.toString(); 
    }

    logout() {
        console.log(this.back_to_string());
    }
}