// =============================================
// 층별 강의실 데이터 (실제 프로젝트 데이터)
// =============================================
var floors = [
    {
        floor: 1,
        color: 'blue',
        rooms: [
            { name: '대강당',               areaId: 'area_auditorium' },
            { name: '유체역학실험실습실',    areaId: 'area_fluid_lab' },
            { name: '밀폐공간실습실',        areaId: 'area_confined_lab' },
            { name: '건설안전실습실',        areaId: 'area_construction_lab' },
            { name: '건설안전실습실2',       areaId: 'area_construction_lab2' },
            { name: '기계종합실습실',        areaId: 'area_machinery_lab' },
            { name: '줄걸이ㆍ프레스실습실', areaId: 'area_press_lab' },
            { name: '크레인실습실',          areaId: 'area_crane_lab' }
        ]
    },
    {
        floor: 2,
        color: 'indigo',
        rooms: [
            { name: '201강의실',         areaId: 'area_201_room' },
            { name: '202강의실',         areaId: 'area_202_room' },
            { name: '203강의실',         areaId: 'area_203_room' },
            { name: '204강의실',         areaId: 'area_204_room' },
            { name: '건강검진실습실',    areaId: 'area_clinic_lab' },
            { name: '위험물취급실습실',  areaId: 'area_hazmat_lab' },
            { name: '작업환경실습실',    areaId: 'area_workenv_lab' },
            { name: '청력보존실습실',    areaId: 'area_power_lab' },
            { name: '화학설비실습실',    areaId: 'area_chemical_lab' },
            { name: '휴먼에러실습실',    areaId: 'area_humanerror_lab' }
        ]
    },
    {
        floor: 3,
        color: 'purple',
        rooms: [
            { name: '301강의실',                    areaId: 'area_301_room' },
            { name: '302강의실',                    areaId: 'area_302_room' },
            { name: '303강의실',                    areaId: 'area_303_room' },
            { name: '304강의실',                    areaId: 'area_304_room' },
            { name: '305강의실',                    areaId: 'area_305_room' },
            { name: '306강의실',                    areaId: 'area_306_room' },
            { name: '컴퓨터실습실',                 areaId: 'area_computer_lab' },
            { name: '전기기초실무실습실',            areaId: 'area_elec_base_lab' },
            { name: '전기안전점검실습실',            areaId: 'area_elec_safety_lab' },
            { name: '인간공학실습실',               areaId: 'area_ergonomics_lab' },
            { name: '석연실습실',                   areaId: 'area_asbestos_lab' },
            { name: '소음진동실습실1',              areaId: 'area_noise_lab' },
            { name: '소음진동실습실2',              areaId: 'area_noise_lab2' },
            { name: '보호구실습실',                 areaId: 'area_ppe_lab' },
            { name: '극소배기장치실습실 및 강의실', areaId: 'area_exhaust_lab' }
        ]
    },
    {
        floor: 4,
        color: 'pink',
        rooms: [
            { name: '401강의실', areaId: 'area_401_room' },
            { name: '402강의실', areaId: 'area_402_room' }
        ]
    }
];

var floorColorMap = { 1: 'blue', 2: 'indigo', 3: 'purple', 4: 'pink' };

// =============================================
// 층 선택
// =============================================
function selectFloor(floor) {
    document.querySelectorAll('.floor-btn[data-floor]').forEach(function(b) {
        b.classList.remove('selected');
    });
    var selectedBtn = document.querySelector('.floor-btn[data-floor="' + floor + '"]');
    if (selectedBtn) selectedBtn.classList.add('selected');

    document.querySelectorAll('.floor-map-wrap svg rect[id^="area_"], .floor-map-wrap svg path[id^="area_"]').forEach(function(area) {
        area.classList.remove('active');
    });

    document.querySelectorAll('.floor-map-wrap').forEach(function(wrap) {
        wrap.style.display = 'none';
    });

    var targetMap = document.getElementById('floor_' + floor + 'f');
    var noImage = document.getElementById('no-image');
    if (targetMap) {
        targetMap.style.display = 'block';
        if (noImage) noImage.style.display = 'none';
    } else {
        if (noImage) noImage.style.display = 'block';
    }

    updateFloorPlanIcon(floor);
    updateClassroomGrid(floor);
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
    var targetMap = document.getElementById('floor_' + floor + 'f');
    if (targetMap && targetMap.style.display === 'none') {
        selectFloor(floor);
    }

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
// changeFloor (원본 유지)
// =============================================
function changeFloor(floor, btn) {
    selectFloor(floor);
}

// =============================================
// SVG area 클릭 이벤트 (원본 유지)
// =============================================
if (!window._classroomSvgBound) {
    window._classroomSvgBound = true;
    document.addEventListener('click', function(e) {
        var target = e.target;
        if (!target || !target.id || !target.id.startsWith('area_')) return;
        var floorWrap = target.closest && target.closest('.floor-map-wrap');
        if (!floorWrap) return;
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