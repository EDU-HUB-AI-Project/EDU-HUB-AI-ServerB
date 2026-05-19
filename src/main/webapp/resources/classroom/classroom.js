function changeFloor(floor, btn) {

    var buttons = document.querySelectorAll('.floor-btn');
    buttons.forEach(function(b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    var allLabels = document.querySelectorAll('.floor-labels');
    allLabels.forEach(function(l) {
        l.style.display = 'none';
    });

    var currentLabels = document.getElementById('labels-' + floor);
    var img = document.getElementById('floor-img');
    var noImage = document.getElementById('no-image');
    var tempImg = new Image();

    tempImg.onload = function() {
        img.onload = null;
        img.onerror = null;
        img.src = '/images/floor_' + floor + 'f.png';
        img.style.display = 'block';
        noImage.style.display = 'none';
        if (currentLabels) {
            currentLabels.style.display = 'block';
        }
    };

    tempImg.onerror = function() {
        img.style.display = 'none';
        noImage.style.display = 'block';
        if (currentLabels) {
            currentLabels.style.display = 'none';
        }
    };

    tempImg.src = '/images/floor_' + floor + 'f.png';
}