function changeFloor(floor, btn) {

    var buttons = document.querySelectorAll('.floor-btn');
    buttons.forEach(function(b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    /* 강조 이미지 전체 숨기기 */
    var allAreas = document.querySelectorAll('[id^="area_"]');
    allAreas.forEach(function(area) {
        area.style.display = 'none';
    });

    /* 강의실 목록 전체 숨기기 */
    var allRoomLists = document.querySelectorAll('[id^="room-list-"]');
    allRoomLists.forEach(function(list) {
        list.style.display = 'none';
    });

    /* 해당 층 강의실 목록 표시 */
    var roomList = document.getElementById('room-list-' + floor);
    if (roomList) roomList.style.display = 'flex';

    var img     = document.getElementById('floor-img');
    var noImage = document.getElementById('no-image');
    var tempImg = new Image();

    var src = '/images/floor_' + floor + 'f/floor_' + floor + 'f.png';

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
    };

    tempImg.src = src;
}

/* 강의실 강조 함수 */
function highlightRoom(areaName) {

    /* 모든 강조 이미지 숨기기 */
    var allAreas = document.querySelectorAll('[id^="area_"]');
    allAreas.forEach(function(area) {
        area.style.display = 'none';
    });

    /* 해당 강의실 강조 이미지 표시 */
    var highlight = document.getElementById(areaName);
    if (highlight) highlight.style.display = 'block';
}