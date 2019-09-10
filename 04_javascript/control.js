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
            } else { // action when no coordinates provided
                desired_position = el.getAttribute("position");
            }
            console.log("Desired " + desired_position.x + " Actual: " + camera.getAttribute('position').toString());
            if (desired_position == camera.getAttribute('position')) {
                console.log("same");
                return;
            }

            var blinkTeleportationEls = document.querySelectorAll('[change-position]');
            console.log(blinkTeleportationEls.length);
            for (var i = 0; i < blinkTeleportationEls.length; i++) {
                // RESET THE CLICKABLE VALUE FOR ALL THE BLINK-TELEPORTATION ELEMENTS
                blinkTeleportationEls[i].setAttribute('class', 'clickable');
                // THEN MAKE ONLY THE SELECTED BLINK-TELEPORTATION ELEMENT NOT-CLICKABLE
                el.setAttribute('class', 'not-clickable');
            }

            camera.setAttribute('position', desired_position);

            // TRYING ANIMATION TODO
            var animation = document.createElement("a-animation");
            animation.setAttribute("attribute","position");
            animation.setAttribute("to",desired_position);
            animation.setAttribute("dur","2000");
            animation.setAttribute("easing","linear");
            console.log("Animating");
            camera.appendChild(animation);
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
            var previous = document.getElementsByClassName("visible");
            if (previous[0] != undefined)
                previous[0].classList.remove("visible");
            var window = document.getElementById(window_id);
            window.classList.add("visible");

            // find out if there is gallery
            var window_child = window.children[1].children[0];
            if (window_child.classList.contains("gallery_wrapper")) {
                console.log("Initialisng gallery");
                init_gallery(window_child); // function in gallery control
            }
        });
    }
});

/**
 * For loading screen to know when to end.
 */
AFRAME.registerComponent('big_model', {
    init: function() {
       this.el.addEventListener('model-loaded', e => {
           console.log("removing loading");
           document.querySelector("#loading_screen").remove();
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

function degToRad(degrees)
{
  return degrees * (Math.PI/180);
}

/**
 * Autoscaling component - centers gltf model and scales it.
 * If you use it, note that rotation has to be inserted via this component.
 */
AFRAME.registerComponent('autoscale', {
    schema: {
        scale: {
            type: 'number', default: 1
        },
        rotation: {
            type: 'vec3', default: "0 0 0"
        }
    },
    init: function () {
      this.scale();
      this.el.addEventListener('object3dset', () => this.scale());
    },
    scale: function () {
      const el = this.el;
      const span = this.data.scale;
      const rotation = this.data.rotation;
      const mesh = el.getObject3D('mesh');
  
      if (!mesh) return;
      // Rotation - IN RADIANS!!
      mesh.rotation.set(degToRad(rotation.x), degToRad(rotation.y), degToRad(rotation.z));
      //mesh.rotation.set(-Math.PI/2, 0, Math.PI*0.61);
      // Compute bounds.
      const bbox = new THREE.Box3().setFromObject(mesh);
  
      // Normalize scale.
      const scale = span / bbox.getSize().length();
      mesh.scale.set(scale, scale, scale);
      //mesh.rotation.set(90, 0, 35);
  
      // Recenter.
      const offset = bbox.getCenter().multiplyScalar(scale);
      mesh.position.sub(offset);
    }
  });

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
