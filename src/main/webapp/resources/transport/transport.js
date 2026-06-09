// 교통 안내 페이지 — 지도 / 버스(BIS) / 시간표(DB 등록분)

var map;
var markers = [];
var activeInfoWindows = [];
var ORIGIN;
var DESTINATIONS;
var transportSchedules = []; // 관리자 등록 시간표
var currentRouteType = null;

// 탭별 시간표 TYPE 매핑
var SCHEDULE_TYPE_MAP = {
    station: ['KTX', 'SRT'],
    terminal: ['EXBUS'],
    airport: ['AIRPORT'],
    shuttle: ['SHUTTLE']
};

var SCHEDULE_BLOCK_TITLE = {
    KTX: 'KTX 운행 시간표',
    SRT: 'SRT 운행 시간표',
    EXBUS: '고속·시외버스 운행 시간표',
    AIRPORT: '공항 운행 시간표',
    SHUTTLE: '셔틀버스 운행 시간표'
};

var SCHEDULE_BTN_META = {
    KTX: { icon: '🚆', cssClass: 'schedule-btn-ktx', label: 'KTX 시간표' },
    SRT: { icon: '🚄', cssClass: 'schedule-btn-srt', label: 'SRT 시간표' },
    TAEHWA: { icon: '🚃', cssClass: 'schedule-btn-taehwa', label: '운행 시간표' },
    EXBUS: { icon: '🚌', cssClass: 'schedule-btn-terminal', label: '버스 시간표' },
    AIRPORT: { icon: '✈️', cssClass: 'schedule-btn-airport', label: '공항 시간표' }
};

// 버튼 눌러야 시간표 보이는 탭 (셔틀 제외)
var ROUTE_SCHEDULE_BUTTONS = {
    station: ['KTX', 'SRT'],
    taehwa: '__location__',
    terminal: ['EXBUS'],
    airport: ['AIRPORT']
};

// 태화강은 TYPE 없이 출발·도착지 키워드로 찾음
var ROUTE_LOCATION_KEYWORDS = {
    taehwa: '태화강'
};

var SCHEDULE_HEADER_CLASSES =
    'schedule-btn-ktx schedule-btn-srt schedule-btn-taehwa schedule-btn-terminal schedule-btn-airport';

function initTransportPage() {
    bindScheduleModalEvents();
    loadTransportSchedules(function() {
        initTransportMap();
    });
}

// 시간표 팝업 닫기
function bindScheduleModalEvents() {
    $('#schedule-modal-close, #schedule-modal-close-btn').on('click', closeSchedulePopup);
    $('#schedule-modal-overlay').on('click', function(e) {
        if (e.target === this) closeSchedulePopup();
    });
}

// DB 시간표 로드
function loadTransportSchedules(callback) {
    $.ajax({
        url: '/facility/transport/schedule.do',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            transportSchedules = data || [];
            if (typeof callback === 'function') callback();
        },
        error: function() {
            transportSchedules = [];
            if (typeof callback === 'function') callback();
        }
    });
}

function initTransportMap() {
    kakao.maps.load(function() {
        ORIGIN = new kakao.maps.LatLng(35.564887329486496, 129.32046843019748);

        DESTINATIONS = {
            station: {
                name: '울산역',
                coords: new kakao.maps.LatLng(35.550686, 129.137939),
                stopId: 'TODO',
                busDest: 'station'
            },
            taehwa: {
                name: '태화강역',
                coords: new kakao.maps.LatLng(35.53881719, 129.3534992),
                stopId: 'TODO'
            },
            terminal: {
                name: '울산고속버스터미널',
                coords: new kakao.maps.LatLng(35.5365477, 129.3396948),
                stopId: 'TODO'
            },
            airport: {
                name: '울산공항',
                coords: new kakao.maps.LatLng(35.593002, 129.352157),
                stopId: 'TODO'
            }
        };

        var container = document.getElementById('map-transport');
        map = new kakao.maps.Map(container, { center: ORIGIN, level: 5 });

        var originMarker = new kakao.maps.Marker({ position: ORIGIN });
        originMarker.setMap(map);

        var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:5px;font-size:12px;font-weight:bold;">한국산업안전보건교육원</div>'
        });
        infowindow.open(map, originMarker);

        setTimeout(function() {
            if (map) {
                map.relayout();
                map.setCenter(ORIGIN);
            }
        }, 100);
    });
}

function clearOverlays() {
    markers.forEach(function(m) { m.setMap(null); });
    activeInfoWindows.forEach(function(iw) { iw.close(); });
    markers = [];
    activeInfoWindows = [];
}

// 상단 탭 선택 — 지도·버스·가는길·시간표 영역 전환
function searchRoute(type) {
    currentRouteType = type;
    closeSchedulePopup();

    $('.route-btn').removeClass('active');
    $(event.currentTarget).addClass('active');

    $('.route-card').removeClass('active');
    $('.route-card[data-type="' + type + '"]').addClass('active');

    clearOverlays();

    if (type === 'shuttle') {
        $('#bus-result').hide();
        kakao.maps.load(function() {
            if (map) {
                map.setCenter(ORIGIN);
                map.setLevel(5);
            }
        });
        updateShuttleSummary();
        renderScheduleTables(type);
        return;
    }

    var dest = DESTINATIONS[type];
    if (!dest) {
        $('#bus-result').hide();
        renderScheduleTables(type);
        return;
    }

    kakao.maps.load(function() {
        var destMarker = new kakao.maps.Marker({ position: dest.coords });
        destMarker.setMap(map);
        markers.push(destMarker);

        var destInfo = new kakao.maps.InfoWindow({
            content: '<div style="padding:5px;font-size:12px;font-weight:bold;">' + dest.name + '</div>'
        });
        destInfo.open(map, destMarker);
        activeInfoWindows.push(destInfo);

        var bounds = new kakao.maps.LatLngBounds();
        bounds.extend(ORIGIN);
        bounds.extend(dest.coords);
        map.setBounds(bounds);
    });

    var busType = dest.busDest || type;
    showBusInfo(busType, dest);
    renderScheduleTables(type);
}

function updateShuttleSummary() {
    var rows = getRowsByDbType('SHUTTLE');
    var $summary = $('#shuttle-route-summary');

    if (!rows.length) {
        $summary.text('등록된 셔틀 운행 시간표가 없습니다.');
        return;
    }

    var first = rows[0];
    $summary.html(
        '📍 <strong>' + escapeHtml(first.departLocation || '-') + '</strong>' +
        ' ↔ <strong>' + escapeHtml(first.destination || '-') + '</strong>'
    );
}

function getRowsByDbType(dbType) {
    var key = (dbType || '').toUpperCase();
    return transportSchedules
        .filter(function(row) {
            return row.type && row.type.toUpperCase() === key;
        })
        .sort(compareScheduleRows);
}

function getRowsByLocationKeyword(keyword) {
    if (!keyword) return [];

    return transportSchedules
        .filter(function(row) {
            var text = (row.departLocation || '') + (row.destination || '');
            return text.indexOf(keyword) >= 0;
        })
        .sort(compareScheduleRows);
}

function compareScheduleRows(a, b) {
    return (a.departTime || '').localeCompare(b.departTime || '');
}

// 하단 시간표 영역 — 셔틀은 바로 표시, 나머지는 버튼만
function renderScheduleTables(routeType) {
    var $area = $('#transport-schedule-area');
    $area.empty();

    if (routeType === 'shuttle') {
        renderInlineSchedule($area, routeType);
        return;
    }

    if (ROUTE_SCHEDULE_BUTTONS[routeType]) {
        renderScheduleButtons($area, routeType);
        return;
    }

    $area.hide();
}

function renderInlineSchedule($area, routeType) {
    var dbTypes = SCHEDULE_TYPE_MAP[routeType];
    if (!dbTypes || !dbTypes.length) {
        $area.hide();
        return;
    }

    var hasAny = false;
    dbTypes.forEach(function(dbType) {
        var rows = getRowsByDbType(dbType);
        if (!rows.length) return;

        hasAny = true;
        $area.append(buildScheduleBlock(dbType, rows, false));
    });

    if (hasAny) {
        $area.css('display', 'flex');
    } else {
        $area.hide();
    }
}

function renderScheduleButtons($area, routeType) {
    var buttonConfig = ROUTE_SCHEDULE_BUTTONS[routeType];
    if (!buttonConfig) {
        $area.hide();
        return;
    }

    var html = '<div class="schedule-btn-row">';

    if (buttonConfig === '__location__') {
        html += buildScheduleButtonHtml({
            popupKey: routeType,
            meta: SCHEDULE_BTN_META.TAEHWA,
            rows: getRowsByLocationKeyword(ROUTE_LOCATION_KEYWORDS[routeType])
        });
    } else {
        buttonConfig.forEach(function(dbType) {
            html += buildScheduleButtonHtml({
                popupKey: dbType,
                meta: SCHEDULE_BTN_META[dbType],
                rows: getRowsByDbType(dbType)
            });
        });
    }

    html += '</div>';
    $area.html(html).css('display', 'flex');
}

function buildScheduleButtonHtml(config) {
    var meta = config.meta;
    if (!meta) return '';

    var rows = config.rows || [];
    var disabled = rows.length ? '' : ' disabled';
    var clickAttr = rows.length
        ? ' onclick="openSchedulePopup(\'' + config.popupKey + '\')"'
        : '';

    return (
        '<button type="button" class="schedule-open-btn ' + meta.cssClass + '"' +
        disabled + clickAttr + '>' +
        '<span class="schedule-btn-icon">' + meta.icon + '</span>' +
        '<span class="schedule-btn-label">' + escapeHtml(meta.label) + '</span>' +
        '</button>'
    );
}

function getSchedulePopupData(popupKey) {
    if (ROUTE_LOCATION_KEYWORDS[popupKey]) {
        return {
            rows: getRowsByLocationKeyword(ROUTE_LOCATION_KEYWORDS[popupKey]),
            title: '태화강역 운행 시간표',
            meta: SCHEDULE_BTN_META.TAEHWA
        };
    }

    var dbType = popupKey;
    return {
        rows: getRowsByDbType(dbType),
        title: SCHEDULE_BLOCK_TITLE[dbType] || (dbType + ' 운행 시간표'),
        meta: SCHEDULE_BTN_META[dbType] || {}
    };
}

// 시간표 팝업 열기
function openSchedulePopup(popupKey) {
    var popup = getSchedulePopupData(popupKey);
    if (!popup.rows.length) return;

    var meta = popup.meta;
    $('#schedule-modal-title').text('🕐 ' + popup.title);
    $('#schedule-modal-table-wrap').html(buildScheduleTableHtml(popup.rows, true));
    $('#schedule-modal-header')
        .removeClass(SCHEDULE_HEADER_CLASSES)
        .addClass(meta.cssClass || '');
    $('#schedule-modal-overlay').addClass('open');
}

function closeSchedulePopup() {
    $('#schedule-modal-overlay').removeClass('open');
}

function buildScheduleBlock(dbType, rows, showArrive) {
    var title = SCHEDULE_BLOCK_TITLE[dbType] || (dbType + ' 운행 시간표');

    return (
        '<div class="schedule-block">' +
        '<div class="schedule-block-title">🕐 ' + escapeHtml(title) + '</div>' +
        '<div class="schedule-block-table-wrap">' +
        buildScheduleTableHtml(rows, showArrive) +
        '</div></div>'
    );
}

function buildScheduleTableHtml(rows, showArrive) {
    var rowsHtml = '';

    rows.forEach(function(row) {
        var arriveCell = showArrive
            ? '<td class="col-arrive">' + escapeHtml(row.arriveTime || '-') + '</td>'
            : '';
        rowsHtml +=
            '<tr>' +
            '<td>' + escapeHtml(row.departLocation || '-') + '</td>' +
            '<td>' + escapeHtml(row.destination || '-') + '</td>' +
            '<td class="col-time">' + escapeHtml(row.departTime || '-') + '</td>' +
            arriveCell +
            '</tr>';
    });

    var arriveHeader = showArrive ? '<th class="col-arrive">도착</th>' : '';

    return (
        '<table class="transport-schedule-table">' +
        '<thead><tr>' +
        '<th>출발 위치</th><th>목적지</th><th>출발</th>' + arriveHeader +
        '</tr></thead>' +
        '<tbody>' + rowsHtml + '</tbody>' +
        '</table>'
    );
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// BIS 실시간 버스 도착
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
        buses.forEach(function(bus) {
            $list.append(
                '<div class="bus-card">' +
                '<span class="bus-no">' + bus.routeNm + '</span>' +
                '<span class="bus-stop">📍 ' + bus.stopNm + '(' + bus.remark + ')' + '</span>' +
                '<span class="bus-arrival">' + Math.ceil(parseInt(bus.arrivalTime) / 60) + '분 후 도착' + '(' + bus.prevStopCnt + '개전 정류장)' + '</span>' +
                '</div>'
            );
        });
    });
}

function fetchBusArrival(type, stopId, callback) {
    $.ajax({
        url: '/facility/transport/bus.do?dest=' + type,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            callback(data);
        },
        error: function() {
            callback([]);
        }
    });
}
