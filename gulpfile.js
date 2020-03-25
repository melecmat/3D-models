const { src, dest, parallel } = require('gulp');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
//var pipeline = require('readable-stream').pipeline;


function css() {
  return src('css/*.css')
    .pipe(concat("3d_player.min.css"))
    .pipe(minifyCSS())
    .pipe(dest('build/css'))
}

function js() {
  return src([
    "javascript_aframe/aframe.min.js", "javascript_aframe/aframe-event-set-component.min.js", 
    "javascript_aframe/aframe-look-at-component.min.js", "compiled_templates.js",
    "04_javascript/a-touch-controls.js", "04_javascript/my-gltf-model.js", "javascript_aframe/aframe-orbit-controls.min.js",
    "04_javascript/control.js", "04_javascript/model_choice.js", "04_javascript/joystick.js", "04_javascript/gallery_control.js",
    "04_javascript/control-panel.js", "04_javascript/popup_control.js", "04_javascript/annotation_window.js"
  ], { sourcemaps: true })
    .pipe(concat('3d_player.min.js'))
    .pipe(minify())
    .pipe(dest('build/js', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.default = parallel(css, js);