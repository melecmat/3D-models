/**
 * Script for back icon to make popups disappear
 */
document.addEventListener("DOMContentLoaded", function() {
    var back_icon = document.getElementsByClassName('back_icon');
    for (var i = 0; i < back_icon.length; i++) {
        back_icon[i].addEventListener('click', function() {
            var popup = document.getElementsByClassName('popup');
            for (var l = 0; l < popup.length; l++) {
                popup[l].classList.remove('visible');
            }
        });
    }
});
