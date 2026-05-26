function selectFloor(floor) {
    document.querySelectorAll('.floor-btn[data-floor]').forEach(function(b) {
        b.classList.remove('selected');
    });
    var selectedBtn = document.querySelector('.floor-btn[data-floor="' + floor + '"]');
    if (selectedBtn) selectedBtn.classList.add('selected');

    document.querySelectorAll('.floor-map-wrap svg rect[id^="area_"], .floor-map-wrap svg path[id^="area_"]').forEach(function(area) {
        area.classList.remove('active');
    });

    document.querySelectorAll('[id^="room-ul-"]').forEach(function(ul) {
        ul.style.display = 'none';
    });
    document.querySelectorAll('[id^="room-ul-"] ul').forEach(function(subUl) {
        subUl.style.display = 'none';
    });
    var targetUl = document.getElementById('room-ul-' + floor);
    if (targetUl) targetUl.style.display = 'block';

    document.querySelectorAll('.floor-map-wrap').forEach(function(wrap) {
        wrap.style.display = 'none';
    });
    var targetMap = document.getElementById('map-floor-' + floor);
    var noImage = document.getElementById('no-image');
    if (targetMap) {
        targetMap.style.display = 'block';
        if (noImage) noImage.style.display = 'none';
    } else {
        if (noImage) noImage.style.display = 'block';
    }
}

function changeFloor(floor, btn) {
    selectFloor(floor);
}

function highlightRoom(areaName, floor) {
    var targetMap = document.getElementById('map-floor-' + floor);
    if (targetMap && targetMap.style.display === 'none') {
        selectFloor(floor);
    }

    document.querySelectorAll('.floor-map-wrap svg rect[id^="area_"], .floor-map-wrap svg path[id^="area_"], .floor-map-wrap svg g[id^="area_"]').forEach(function(area) {
        area.classList.remove('active');
    });

    var target = document.getElementById(areaName);
    if (target) {
        target.classList.add('active');
    }
}

function toggleFloorList(floorNum) {
    document.querySelectorAll('[id^="room-ul-"]').forEach(function(ul) {
        if (ul.id !== 'room-ul-' + floorNum) ul.style.display = 'none';
    });
    document.querySelectorAll('[id^="room-ul-"] ul').forEach(function(subUl) {
        var parentUl = subUl.closest('[id^="room-ul-"]');
        if (parentUl && parentUl.id !== 'room-ul-' + floorNum) subUl.style.display = 'none';
    });

    var ul = document.getElementById('room-ul-' + floorNum);
    if (ul) {
        ul.style.display = (ul.style.display === 'none' || ul.style.display === '') ? 'block' : 'none';
    }
}

function toggleSubList(element) {
    if (window.event) window.event.stopPropagation();

    var ul = null;
    if (typeof element === 'string') {
        ul = document.getElementById(element);
        if (!ul) {
            document.querySelectorAll('[id^="room-ul-"] > li').forEach(function(li) {
                if (li.textContent.includes(element.replace('sub-ul-', ''))) {
                    ul = li.querySelector('ul');
                }
            });
        }
    } else if (element && element.tagName) {
        var targetLi = element.tagName === 'LI' ? element : element.closest('li');
        if (targetLi) ul = targetLi.querySelector('ul');
    }

    if (ul) {
        ul.style.display = (ul.style.display === 'none' || ul.style.display === '') ? 'block' : 'none';
    }
}

if (!window._classroomSvgBound) {
    window._classroomSvgBound = true;
    document.addEventListener('click', function(e) {
        var target = e.target;
        if (!target || !target.id || !target.id.startsWith('area_')) return;
        var floorWrap = target.closest && target.closest('.floor-map-wrap');
        if (!floorWrap) return;
        var floorNum = parseInt(floorWrap.id.replace('map-floor-', '')) || 1;
        highlightRoom(target.id, floorNum);
    });
}
