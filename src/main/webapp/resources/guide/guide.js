var roomFloorMap = {
    // 현재 인천 도면 없음
    incheon: {
        '201': 2, '202': 2, '203': 2, '204': 2,
        '301': 3, '302': 3, '303': 3,
        '401': 4, '402': 4, '405': 4
    },
    ulsan: {
        '201': 2, '202': 2, '203': 2, '204': 2,
        '301': 3, '302': 3, '303': 3, '304': 3, '305': 3, '306': 3,
        '401': 4, '402': 4
    }
};

var dormFloorMap = {
    incheon: {
        '201': 2, '202': 2, '203': 2, '204': 2,
        '301': 3, '302': 3, '303': 3,
        '401': 4, '402': 4
    },
    ulsan: {
        '201': 2, '202': 2, '203': 2, '204': 2,
        '301': 3, '302': 3, '303': 3,
        '401': 4, '402': 4
    }
};


function initGuideCanvas(roomName) {
    var site = KIOSK_SITE || 'incheon';
    var siteMap = roomFloorMap[site] || roomFloorMap['incheon'];
    var floor = siteMap[roomName];

    if(!floor) {
        $('#classroom-map-area').hide();
        $('#classroom-map-fallback').show();
        return;
    }

    // var svgPath = '/images/eduInfo/' + site + '/floor_' + floor + 'f.svg';
    var svgPath = '/images/eduInfo/floor_' + floor + 'f.svg';

    fetch(svgPath)
        .then(function(response) {return response.text(); })
        .then(function(svgText) {
            var container = document.getElementById('svg-container');
            container.innerHTML = svgText;

            var svgEl = container.querySelector('svg');
            if(svgEl) {
                svgEl.removeAttribute('width');
                svgEl.removeAttribute('height');
                svgEl.style.width = '100%';
                svgEl.style.height = 'auto';
            }

            var target = container.querySelector('#area_' + roomName + '_room');
            if(target) {
                target.classList.add('room-highlight');
                $('#classroom-map-fallback').hide();
                $('#classroom-map-area').show();
            }
            else {
                $('#classroom-map-area').hide();
                $('#classroom-map-fallback').show();
            }
        })
        .catch(function() {
            $('#classroom-map-area').hide();
            $('#classroom-map-fallback').show();
        });
}

function initDormCanvas(dormRoom) {
    if(!dormRoom) return;

    var site = KIOSK_SITE || 'incheon';
    var siteMap = dormFloorMap[site] || dormFloorMap['incheon'];
    var floor = siteMap[dormRoom];

    if(!floor) return;

    fetch('/images/dormInfo/dorm_' + floor + 'f.svg')
        .then(function(res) {return res.text(); })
        .then(function(svgText) {
            var container = document.getElementById('dorm-svg-container');
            container.innerHTML = svgText;

            var svgEl = container.querySelector('svg');
            if(svgEl) {
                svgEl.removeAttribute('width');
                svgEl.removeAttribute('height');
                svgEl.style.width = '100%';
                svgEl.style.height = 'auto';
            }

            var target = container.querySelector('#room-' + dormRoom);
            if(target) {
                target.classList.add('dorm-highlight');
                $('#dorm-modal-title').text(dormRoom + '호 위치');
                $('#dorm-map-fallback').hide();
                $('#dorm-map-btn-wrap').show();
            }
        })
        .catch(function() {

        });
}

function openDormModal() {
    $('#dorm-modal-overlay').addClass('open');
}

function closeDormModal() {
    $('#dorm-modal-overlay').removeClass('open');
}