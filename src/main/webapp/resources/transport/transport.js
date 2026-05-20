var map;
var markers = [];
var activeInfoWindows = [];
var ORIGIN;
var DESTINATIONS;

kakao.maps.load(function() {
    ORIGIN = new kakao.maps.LatLng(35.564887329486496, 129.32046843019748);

    DESTINATIONS = {
        station: {
            name: '울산역(KTX)',
            coords: new kakao.maps.LatLng(35.550686, 129.137939),
            stopId: 'TODO'
        },
        terminal: {
            name: '울산고속버스터미널',
            coords: new kakao.maps.LatLng(35.5365477, 129.3396948),
            stopId: 'TODO'
        }
    };

    var container = document.getElementById('map');
    map = new kakao.maps.Map(container, { center: ORIGIN, level: 5 });

    var originMarker = new kakao.maps.Marker({ position: ORIGIN });
    originMarker.setMap(map);

    var infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;font-size:12px;font-weight:bold;">한국산업안전보건교육원</div>'
    });
    infowindow.open(map, originMarker);
});

/* 마커/인포윈도우 초기화 */
function clearOverlays() {
    markers.forEach(function(m) { m.setMap(null); });
    activeInfoWindows.forEach(function(iw) { iw.close(); });
    markers = [];
    activeInfoWindows = [];
}

/* 길찾기 버튼 클릭 */
function searchRoute(type) {
    $('.route-btn').removeClass('active');
    $(event.currentTarget).addClass('active');
    var dest = DESTINATIONS[type];
    clearOverlays();

    kakao.maps.load(function() {
        /* 목적지 마커 */
        var destMarker = new kakao.maps.Marker({ position: dest.coords });
        destMarker.setMap(map);
        markers.push(destMarker);

        var destInfo = new kakao.maps.InfoWindow({
            content: '<div style="padding:5px;font-size:12px;font-weight:bold;">' + dest.name + '</div>'
        });
        destInfo.open(map, destMarker);
        activeInfoWindows.push(destInfo);

        /* 두 지점이 보이도록 지도 범위 조정 */
        var bounds = new kakao.maps.LatLngBounds();
        bounds.extend(ORIGIN);
        bounds.extend(dest.coords);
        map.setBounds(bounds);
    });

    /* 버스 안내 */
    showBusInfo(type, dest);
}

/* 버스 안내 영역 표시 */
function showBusInfo(type, dest) {
    var $result = $('#bus-result');
    var $title = $('#bus-result-title');
    var $list = $('#bus-card-list');

    $result.show();
    $title.text('🚏 ' + dest.name + ' 방면 버스 안내');
    $list.html('<p class="loading-text">버스 정보를 불러오는 중...</p>');

    fetchBusArrival(type, dest.stopId, function(buses) {
        if (!buses || buses.length === 0) {
            $list.html('<p class="no-bus-text">현재 버스 정보를 불러올 수 없습니다.</p>');
            return;
        }
        $list.empty();
        // 테스트 케이스용 아웃풋
        buses.forEach(function(bus) {
            $list.append(
                '<div class="bus-card">' +
                '<span class="bus-no">' + bus.routeNm + '</span>' +
                '<span class="bus-stop">📍 ' + bus.stopNm + '</span>' +
                '<span class="bus-arrival">' + Math.ceil(bus.arrivalTime / 60) + '분 후 도착</span>' +
                '</div>'
            );
        });
        // buses.forEach(function(bus) {
        //     $list.append(
        //         '<div class="bus-card">' +
        //         '<span class="bus-no">' + bus.routeNo + '번</span>' +
        //         '<span class="bus-stop">📍 ' + bus.stopName + '</span>' +
        //         '<span class="bus-arrival">' + bus.arrivalMsg + '</span>' +
        //         '</div>'
        //     );
        // });
    });
}

/* BIS API 호출 */
function fetchBusArrival(type, stopId, callback) {
    /* TODO: BIS API 승인 후 실제 호출로 교체 */
    var mockData = {
        station: [
            { routeNm: '5003(울산역 방면)', arrivalTime: 180, prevStopCnt: 3, stopNm: '성안동 정류장' },
            { routeNm: '327(울산역 방면)', arrivalTime: 420, prevStopCnt: 7, stopNm: '성안동 정류장' },
            { routeNm: '114(울산역 방면)', arrivalTime: 660, prevStopCnt: 11, stopNm: '성안동 정류장' }
        ],
        terminal: [
            { routeNm: '233(고속버스터미널 방면)', arrivalTime: 300, prevStopCnt: 5, stopNm: '성안동 정류장' },
            { routeNm: '401(고속버스터미널 방면)', arrivalTime: 720, prevStopCnt: 12, stopNm: '성안동 정류장' }
        ]
    };
    callback(mockData[type] || []);
    // var url = 'http://openapi.its.ulsan.kr/UlsanAPI/BusArrivalInfo.xo' +
    //     '?serviceKey=' + BIS_KEY +
    //     '&StopId=' + stopId +
    //     '&pageNo=1&numOfRows=20';

    // $.ajax({
    //     url: url,
    //     type: 'GET',
    //     dataType: 'xml',
    //     success: function(xml) {
    //         callback(parseBusArrival(xml));
    //     },
    //     error: function() {
    //         callback([]);
    //     }
    // });
}

/* BIS XML 파싱 */
function parseBusArrival(xml) {
    var result = [];
    $(xml).find('item').each(function() {
        var routeNo   = $(this).find('ROUTENO').text();
        var stopName  = $(this).find('STOPNM').text();
        var remainMin = $(this).find('REMAINTIME').text();
        var arrivalMsg = remainMin ? remainMin + '분 후 도착' : $(this).find('ARRIVALMSG').text();
        if (routeNo) {
            result.push({ routeNo: routeNo, stopName: stopName, arrivalMsg: arrivalMsg });
        }
    });
    return result;
}