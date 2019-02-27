var back_icon = document.getElementsByClassName('back_icon');
var popup = document.getElementsByClassName('popup');
for (var i = 0; i < popup.length; i++)
back_icon[0].addEventListener('click', function() {
    popup[0].classList.remove('visible');
});