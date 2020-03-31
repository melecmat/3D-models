const { src, dest, parallel, series } = require('gulp');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');


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
    "04_javascript/control-panel.js", "04_javascript/popup_control.js", "04_javascript/annotation_window.js",
    "javascript_aframe/arrive.min.js"
  ], { sourcemaps: false })
    .pipe(concat('3d_player.min.js'))
    .pipe(minify())
    .pipe(dest('build/js', { sourcemaps: false }))
}

function templates () {
  return src('templates/*.handlebars')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Handlebars.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('compiled_templates.js'))
    .pipe(dest('./'));
}

exports.templates = templates;
exports.js = js;
exports.css = css;
exports.default = series(templates, parallel(css, js));