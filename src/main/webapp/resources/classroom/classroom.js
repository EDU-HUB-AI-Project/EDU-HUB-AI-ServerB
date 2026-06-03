// =============================================
// 층별 강의실 데이터 (실제 프로젝트 데이터)
// =============================================
var floors = [];
var floorColorMap = {1: 'blue', 2: 'indigo', 3: 'purple', 4: 'pink' };
var svgCache = {};

// =============================================
// DB 데이터로 floors 초기화
// =============================================
function initClassroom(classroomData) {
    var floorMap = {};
    classroomData.forEach(function(c) {
        if (!floorMap[c.floor]) {
            floorMap[c.floor] = {
                floor: c.floor,
                color: floorColorMap[c.floor] || 'blue',
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

    buildFloorButtons();
}

// =============================================
// 층 버튼 동적 생성
// =============================================
function buildFloorButtons() {
    var container = document.querySelector('.floor-buttons');
    if (!container) return;
    container.innerHTML = '';

    floors.forEach(function(f, i) {
        var color = f.color;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'floor-btn' + (i === 0 ? ' selected' : '');
        btn.setAttribute('data-floor', f.floor);
        btn.onclick = (function(floor) {
            return function() { selectFloor(floor); };
        })(f.floor);

        btn.innerHTML =
            '<div class="floor-glow floor-glow-' + color + '"></div>' +
            '<div class="floor-bg floor-bg-' + color + '"></div>' +
            '<div class="floor-bg-white"></div>' +
            '<div class="floor-content">' +
                '<div class="floor-header">' +
                    '<span class="floor-number">' + f.floor + '층</span>' +
                    '<div class="floor-indicator"></div>' +
                '</div>' +
                '<p class="floor-rooms">' + f.floor + '층 강의실</p>' +
            '</div>' +
            '<div class="floor-border"></div>';

        container.appendChild(btn);
    });
}

// =============================================
// 층 선택
// =============================================
function selectFloor(floor) {
    document.querySelectorAll('.floor-btn[data-floor]').forEach(function(b) {
        b.classList.remove('selected');
    });
    var selectedBtn = document.querySelector('.floor-btn[data-floor="' + floor + '"]');

    if(selectedBtn) selectedBtn.classList.add('selected');

    updateFloorPlanIcon(floor);
    updateClassroomGrid(floor);
    loadFloorSvg(floor);
}

// =============================================
// SVG 동적 로드 (캐싱)
// =============================================
function loadFloorSvg(floor) {
    var floorData = floors.find(function(f) {
        return f.floor === floor;
    });

    if(!floorData || !floorData.imagePath) {
        var noImage = document.getElementById('no-image');
        if(noImage) {
            noImage.style.display = 'block';
            return;
        }
    }

    if(svgCache[floor]) {
        renderSvg(floor, svgCache[floor]);
        return;
    }

    fetch(floorData.imagePath)
        .then(function(res) {return res.text(); })
        .then(function(svgText) {
            svgCache[floor] = svgText;
            renderSvg(floor, svgText);
        })
        .catch(function() {
            var noImage = document.getElementById('no-image');
            if(noImage) {
                noImage.style.display = 'block';
            }
        });
}

function renderSvg(floor, svgText) {
    var mapArea = document.getElementById('floor-map-area');
    if(!mapArea) {
        return;   
    }

    var noImage = document.getElementById('no-image');
    if(noImage) {
        noImage.style.display = 'none';
    }
    
    mapArea.innerHTML = '<div id="floor_' + floor + 'f" class="floor-map-wrap" style="display:block;">' + svgText + '</div>';
}

// =============================================
// 배치도 타이틀 · 아이콘 업데이트
// =============================================
function updateFloorPlanIcon(floor) {
    var floorTitle = document.getElementById('floor-title');
    if (floorTitle) floorTitle.textContent = floor;

    var planIcon = document.getElementById('plan-icon');
    if (planIcon) {
        planIcon.className = 'plan-icon plan-icon-' + (floorColorMap[floor] || 'blue');
        var planNumber = planIcon.querySelector('.plan-number');
        if (planNumber) planNumber.textContent = floor;
        planIcon.style.animation = 'none';
        setTimeout(function() {
            planIcon.style.animation = 'scaleIn 0.3s ease-out';
        }, 10);
    }
}

// =============================================
// 강의실 카드 그리드 렌더링
// =============================================
function updateClassroomGrid(floor) {
    var grid = document.getElementById('classroom-grid');
    if (!grid) return;

    var floorData = floors.find(function(f) { return f.floor === floor; });
    if (!floorData) return;

    grid.style.opacity = '0';
    grid.style.transform = 'translateY(10px)';

    setTimeout(function() {
        grid.innerHTML = '';

        floorData.rooms.forEach(function(room, index) {
            var card = document.createElement('button');
            card.className = 'room-card';
            card.setAttribute('data-area', room.areaId);
            card.onclick = function() { highlightRoom(room.areaId, floor); };

            var bg = document.createElement('div');
            bg.className = 'room-bg room-bg-' + floorData.color;
            card.appendChild(bg);

            var bgWhite = document.createElement('div');
            bgWhite.className = 'room-bg-white';
            card.appendChild(bgWhite);

            var border = document.createElement('div');
            border.className = 'room-border';
            card.appendChild(border);

            var content = document.createElement('div');
            content.className = 'room-content';

            var roomName = document.createElement('div');
            roomName.className = 'room-name';
            roomName.textContent = room.name;
            content.appendChild(roomName);

            card.appendChild(content);

            var indicator = document.createElement('div');
            indicator.className = 'room-indicator';
            card.appendChild(indicator);

            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(function() {
                card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 40);

            grid.appendChild(card);
        });

        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
        grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }, 200);
}

// =============================================
// 강의실 하이라이트
// =============================================
function highlightRoom(areaId, floor) {
    document.querySelectorAll('.floor-map-wrap svg rect[id^="area_"], .floor-map-wrap svg path[id^="area_"], .floor-map-wrap svg g[id^="area_"]').forEach(function(area) {
        area.classList.remove('active');
    });
    var target = document.getElementById(areaId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.room-card').forEach(function(card) {
        card.classList.remove('selected');
    });
    var selectedCard = document.querySelector('.room-card[data-area="' + areaId + '"]');
    if (selectedCard) selectedCard.classList.add('selected');
}

// =============================================
// changeFloor
// =============================================
function changeFloor(floor, btn) {
    selectFloor(floor);
}

// =============================================
// SVG area 클릭 이벤트
// =============================================
if(!window._classroomSvgBound) {
    window._classroomSvgBound = true;
    document.addEventListener('click', function(e) {
        var target = e.target;
        if(!target || !target.id || !target.id.startsWith('area_')) {
            return;
        }

        var floorWrap = target.closest && target.closest('.floor-map-wrap');
        if(!floorWrap) {
            return;
        }
        var floorNum = parseInt(floorWrap.id.replace('floor_', '').replace('f', '')) || 1;
        highlightRoom(target.id, floorNum);
    });
}

// =============================================
// 버튼 hover 효과
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.floor-btn').forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'scale(1.02)';
            }
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});