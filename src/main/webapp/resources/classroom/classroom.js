var floors = [];
var svgCache = {};

function initClassroom(classroomData) {
    var floorMap = {};
    classroomData.forEach(function(c) {
        if (!floorMap[c.floor]) {
            floorMap[c.floor] = {
                floor: c.floor,
                imagePath: c.imagePath,
                rooms: []
            };
        }
        floorMap[c.floor].rooms.push({
            name: c.classroomName,
            areaId: c.imageId
        });
    });
    floors = Object.keys(floorMap).sort(function(a, b) {
        return a - b;
    }).map(function(k) { return floorMap[k]; });

    buildFloorTabs();
}

function buildFloorTabs() {
    var container = document.getElementById('classroom-floor-tabs');
    if (!container) return;
    container.innerHTML = '';

    floors.forEach(function(f, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tab-pill' + (i === 0 ? ' active' : '');
        btn.setAttribute('data-floor', f.floor);
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        btn.textContent = f.floor + '층';
        btn.addEventListener('click', function() {
            selectFloor(f.floor);
        });
        container.appendChild(btn);
    });
}

function selectFloor(floor) {
    document.querySelectorAll('#classroom-floor-tabs .tab-pill').forEach(function(btn) {
        var isActive = btn.getAttribute('data-floor') === String(floor);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    updateFloorTitle(floor);
    updateClassroomGrid(floor);
    loadFloorSvg(floor);
}

function loadFloorSvg(floor) {
    var floorData = floors.find(function(f) {
        return f.floor === floor;
    });
    var mapArea = document.getElementById('floor-map-area');
    var noImage = document.getElementById('no-image');

    if (!floorData || !floorData.imagePath) {
        if (mapArea) mapArea.innerHTML = '';
        if (noImage) noImage.style.display = 'block';
        return;
    }

    if (svgCache[floor]) {
        renderSvg(floor, svgCache[floor]);
        return;
    }

    fetch(floorData.imagePath)
        .then(function(res) { return res.text(); })
        .then(function(svgText) {
            svgCache[floor] = svgText;
            renderSvg(floor, svgText);
        })
        .catch(function() {
            if (mapArea) mapArea.innerHTML = '';
            if (noImage) noImage.style.display = 'block';
        });
}

function renderSvg(floor, svgText) {
    var mapArea = document.getElementById('floor-map-area');
    var noImage = document.getElementById('no-image');
    if (!mapArea) return;

    if (noImage) noImage.style.display = 'none';
    mapArea.innerHTML = '<div id="floor_' + floor + 'f" class="floor-map-wrap" style="display:block;">' + svgText + '</div>';
}

function updateFloorTitle(floor) {
    var floorTitle = document.getElementById('floor-title');
    if (floorTitle) floorTitle.textContent = floor;
}

function updateClassroomGrid(floor) {
    var grid = document.getElementById('classroom-grid');
    if (!grid) return;

    var floorData = floors.find(function(f) { return f.floor === floor; });
    if (!floorData) return;

    grid.style.opacity = '0';
    grid.style.transform = 'translateY(8px)';

    setTimeout(function() {
        grid.innerHTML = '';

        floorData.rooms.forEach(function(room, index) {
            var card = document.createElement('button');
            card.type = 'button';
            card.className = 'classroom-room-card';
            card.setAttribute('data-area', room.areaId);
            card.textContent = room.name;
            card.addEventListener('click', function() {
                highlightRoom(room.areaId, floor);
            });

            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(function() {
                card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 40);

            grid.appendChild(card);
        });

        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
    }, 150);
}

function highlightRoom(areaId, floor) {
    document.querySelectorAll('#classroom-container .floor-map-wrap svg rect[id^="area_"], #classroom-container .floor-map-wrap svg path[id^="area_"], #classroom-container .floor-map-wrap svg g[id^="area_"]').forEach(function(area) {
        area.classList.remove('active');
    });

    var target = document.getElementById(areaId);
    if (target) target.classList.add('active');

    document.querySelectorAll('#classroom-container .classroom-room-card').forEach(function(card) {
        card.classList.remove('selected');
    });
    var selectedCard = document.querySelector('#classroom-container .classroom-room-card[data-area="' + areaId + '"]');
    if (selectedCard) selectedCard.classList.add('selected');
}

function changeFloor(floor) {
    selectFloor(floor);
}

if (!window._classroomSvgBound) {
    window._classroomSvgBound = true;
    document.addEventListener('click', function(e) {
        var target = e.target;
        if (!target || !target.id || !target.id.startsWith('area_')) {
            return;
        }

        var floorWrap = target.closest && target.closest('.floor-map-wrap');
        if (!floorWrap) {
            return;
        }
        var floorNum = parseInt(floorWrap.id.replace('floor_', '').replace('f', ''), 10) || 1;
        highlightRoom(target.id, floorNum);
    });
}
