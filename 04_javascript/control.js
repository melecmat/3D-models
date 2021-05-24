document.addEventListener("template_done", function() {
    // HOME button functionality
    var camera = document.getElementById("camera");
    var homeButton = document.getElementById("home_button");
    if (homeButton != null) {
        homeButton.addEventListener("click", function() {
            camera.setAttribute("position", json_obj.player.camera_position);
        });
    }

/**
 * My first component, it changes the sky
 * CURRENTLT NOT USED
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
 * CURRENTLY NOT USED
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
            if (desired_position == camera.getAttribute('position')) {
                return;
            }

            var blinkTeleportationEls = document.querySelectorAll('[change-position]');
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
            camera.appendChild(animation);
        });
    }
});

/** 
 * clickable component for popup window
*/
AFRAME.registerComponent ('info-window', {
    schema: {
        window_id: {type: 'string', default: ''}
    },
    update: function() {
        if (!this.el.classList.contains("clickable")) this.el.classList.toggle('clickable');
        //var raycasterEl = document.getElementById("a-scene").querySelector('[raycaster]');
        //raycasterEl.components.raycaster.refreshObjects();
        // SIMPLY WILL NOT WORK !!! :D
        //var raycaster = document.getElementById("raycaster");
        //if (raycaster != null) {
            //document.querySelector("a-scene").removeChild(raycaster);
            //raycaster.setAttribute("raycaster", "objects: .clickable");
            //document.querySelector("a-scene").appendChild(raycaster);
        //}
        var window_id = this.data.window_id;
        this.el.addEventListener('click', function() {
            if (document.getElementById(window_id) == null) return;
            open_popup(window_id, false);
            // find out if there is gallery
            var window = document.getElementById(window_id);
            var galleries = window.getElementsByClassName("popup_body")[0].getElementsByClassName("gallery_wrapper");
            for (const gallery of galleries) {
                GalleryControl.init_gallery(gallery); // function in gallery control
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
           document.querySelector("#loading_screen").remove();
           console.log("Should see model");
       });
       this.el.addEventListener("model-progress", function(e) {
        //console.log(e.progress);
      });
       this.el.addEventListener('model-error', e => {
        //document.querySelector("#loading_screen").remove();
        console.log("Error in loading model");
        });
    }
 });


AFRAME.registerComponent('look-at-camera', {
    tick: function() {
        var camPos = document.getElementById("camera").components.camera.camera.getWorldPosition(new THREE.Vector3());
        this.el.object3D.lookAt(camPos);
    }
});


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

});

function degToRad(degrees) {
  return degrees * (Math.PI/180);
}


/**
 * Not used?
 * Gets the string representing position and rotation if specified of given aframe entity.
 * @param {*} entity aframe entity
 * @param {Boolean} rotation if you want to get rotation
 */
function get_entity_position_string(entity, rotation) {
    var posrot = "";
    var pos = entity.getAttribute("position");
    if (pos == null) return posrot;
    posrot = toFixedTruncate(pos.x, 3) + " " + toFixedTruncate(pos.y, 3) + " " + toFixedTruncate(pos.z, 3);
    if (rotation) {
        var rot_x = entity.components['touch-controls'].pitchObject.rotation.x;
        var rot_y = entity.components['touch-controls'].yawObject.rotation.y;
        posrot += " " + toFixedTruncate(rot_x, 3) + " " + toFixedTruncate(rot_y, 3);
    }
    return posrot;
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