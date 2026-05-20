function changeFloor(floor, btn) {

    var buttons = document.querySelectorAll('.floor-btn');
    buttons.forEach(function(b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    var img     = document.getElementById('floor-img');
    var noImage = document.getElementById('no-image');
    var tempImg = new Image();

    var src = '/images/eduInfo/floor_'+ floor + 'f.png';

    tempImg.onload = function() {
        img.onload  = null;
        img.onerror = null;
        img.src = src;
        img.style.display = 'block';
        noImage.style.display = 'none';
    };

    tempImg.onerror = function() {
        img.style.display = 'none';
        noImage.style.display = 'block';
        if (currentLabels) currentLabels.style.display = 'none';
    };

    tempImg.src = src;
}