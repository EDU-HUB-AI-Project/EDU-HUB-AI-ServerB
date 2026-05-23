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

