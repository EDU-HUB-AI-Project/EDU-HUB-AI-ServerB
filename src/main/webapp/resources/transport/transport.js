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

var SCHEDULE_BTN_SVGS = {
    train: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="12" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="M8 19l-2 2"/><path d="M16 19l2 2"/><path d="M8 15h0"/><path d="M16 15h0"/></svg>',
    tram: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M3 12h18"/><path d="M12 4v8"/><path d="M7 20l-2 2"/><path d="M17 20l2 2"/></svg>',
    bus: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3v-6h-3"/><path d="M3 18h3v-6H3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    plane: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.2 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>'
};

var SCHEDULE_BTN_META = {
    KTX: { iconSvg: SCHEDULE_BTN_SVGS.train, cssClass: 'schedule-btn-ktx', label: 'KTX 시간표' },
    SRT: { iconSvg: SCHEDULE_BTN_SVGS.tram, cssClass: 'schedule-btn-srt', label: 'SRT 시간표' },
    TAEHWA: { iconSvg: SCHEDULE_BTN_SVGS.tram, cssClass: 'schedule-btn-taehwa', label: '운행 시간표' },
    EXBUS: { iconSvg: SCHEDULE_BTN_SVGS.bus, cssClass: 'schedule-btn-terminal', label: '버스 시간표' },
    AIRPORT: { iconSvg: SCHEDULE_BTN_SVGS.plane, cssClass: 'schedule-btn-airport', label: '공항 시간표' }
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
    if (!$('#transport-container').length) return;

    map = null;
    ORIGIN = null;
    DESTINATIONS = null;
    clearOverlays();

    bindScheduleModalEvents();
    loadTransportSchedules(function() {
        var defaultBtn = document.querySelector('#transport-container .route-btn[data-route="shuttle"]');
        searchRoute('shuttle', defaultBtn);
        initTransportMap(finishTransportRouteView);
    });
}

function finishTransportRouteView() {
    if (!currentRouteType) return;

    if (currentRouteType === 'shuttle') {
        kakao.maps.load(function() {
            if (map && ORIGIN) {
                map.setCenter(ORIGIN);
                map.setLevel(5);
            }
            refreshTransportMapLayout();
        });
        return;
    }

    var dest = DESTINATIONS && DESTINATIONS[currentRouteType];
    if (!dest) {
        refreshTransportMapLayout();
        return;
    }

    updateTransportMapForRoute(currentRouteType);
    showBusInfo(dest.busDest || currentRouteType, dest);
    refreshTransportMapLayout();
}

function refreshTransportMapLayout() {
    if (!map || !document.getElementById('map-transport')) return;

    kakao.maps.load(function() {
        if (!map) return;
        map.relayout();
        if (ORIGIN && currentRouteType === 'shuttle') {
            map.setCenter(ORIGIN);
        }
    });
}

var scheduleModalBound = false;

// 시간표 팝업 닫기 (메인 쉘에 모달 고정)
function bindScheduleModalEvents() {
    if (scheduleModalBound) return;
    scheduleModalBound = true;

    $(document).on('click', '#schedule-modal-close, #schedule-modal-close-btn', closeSchedulePopup);
    $(document).on('click', '#schedule-modal-overlay', function(e) {
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

function initTransportMap(callback) {
    if (typeof kakao === 'undefined' || !kakao.maps) {
        if (typeof callback === 'function') callback();
        return;
    }

    kakao.maps.load(function() {
        var container = document.getElementById('map-transport');
        if (!container) {
            if (typeof callback === 'function') callback();
            return;
        }

        ORIGIN = new kakao.maps.LatLng(35.564887329486496, 129.32046843019748);

        DESTINATIONS = {
            station: {
                name: '울산역',
                coords: new kakao.maps.LatLng(35.550686, 129.137939),
                busDest: 'station'
            },
            taehwa: {
                name: '태화강역',
                coords: new kakao.maps.LatLng(35.53881719, 129.3534992),
            },
            terminal: {
                name: '울산고속버스터미널',
                coords: new kakao.maps.LatLng(35.5365477, 129.3396948),
            },
            airport: {
                name: '울산공항',
                coords: new kakao.maps.LatLng(35.593002, 129.352157),
            }
        };

        container.innerHTML = '';
        map = new kakao.maps.Map(container, { center: ORIGIN, level: 5 });

        var originMarker = new kakao.maps.Marker({ position: ORIGIN });
        originMarker.setMap(map);

        var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:5px;font-size:12px;font-weight:bold;">한국산업안전보건교육원</div>'
        });
        infowindow.open(map, originMarker);

        window.requestAnimationFrame(function() {
            if (map) {
                map.relayout();
                map.setCenter(ORIGIN);
            }
            setTimeout(function() {
                if (map) {
                    map.relayout();
                    map.setCenter(ORIGIN);
                }
                if (typeof callback === 'function') callback();
            }, 150);
        });
    });
}

function clearOverlays() {
    markers.forEach(function(m) { m.setMap(null); });
    activeInfoWindows.forEach(function(iw) { iw.close(); });
    markers = [];
    activeInfoWindows = [];
}

// 상단 탭 선택 — 지도·버스·가는길·시간표 영역 전환
function searchRoute(type, triggerEl) {
    currentRouteType = type;
    closeSchedulePopup();

    $('.route-btn').removeClass('active');
    var $btn = triggerEl ? $(triggerEl) : $('.route-btn[data-route="' + type + '"]');
    $btn.addClass('active');

    $('.route-card').removeClass('active');
    $('.route-card[data-type="' + type + '"]').addClass('active');

    clearOverlays();
    renderScheduleTables(type);

    if (type === 'shuttle') {
        $('#bus-result').hide();
        kakao.maps.load(function() {
            if (map && ORIGIN) {
                map.setCenter(ORIGIN);
                map.setLevel(5);
                map.relayout();
            }
        });
        updateShuttleSummary();
        return;
    }

    var dest = DESTINATIONS && DESTINATIONS[type];
    if (!dest) {
        $('#bus-result').hide();
        return;
    }

    updateTransportMapForRoute(type);
    var busType = dest.busDest || type;
    showBusInfo(busType, dest);
}

function updateTransportMapForRoute(type) {
    var dest = DESTINATIONS && DESTINATIONS[type];
    if (!dest) return;

    kakao.maps.load(function() {
        if (!map || !document.getElementById('map-transport')) {
            return;
        }

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
        map.relayout();
    });
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
        '<strong>' + escapeHtml(first.departLocation || '-') + '</strong>' +
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
    $('#transport-schedule-section').hide();
}

function renderInlineSchedule($area, routeType) {
    var dbTypes = SCHEDULE_TYPE_MAP[routeType];
    if (!dbTypes || !dbTypes.length) {
        $area.hide().empty();
        $('#transport-schedule-section').hide();
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
        $('#transport-schedule-section').show();
    } else {
        $area.hide().empty();
        $('#transport-schedule-section').hide();
    }
}

function renderScheduleButtons($area, routeType) {
    var buttonConfig = ROUTE_SCHEDULE_BUTTONS[routeType];
    if (!buttonConfig) {
        $area.hide().empty();
        $('#transport-schedule-section').hide();
        return;
    }

    var buttonsHtml = '';

    if (buttonConfig === '__location__') {
        var locationRows = getRowsByLocationKeyword(ROUTE_LOCATION_KEYWORDS[routeType]);
        if (locationRows.length) {
            buttonsHtml += buildScheduleButtonHtml({
                popupKey: routeType,
                meta: SCHEDULE_BTN_META.TAEHWA,
                rows: locationRows
            });
        }
    } else {
        buttonConfig.forEach(function(dbType) {
            var rows = getRowsByDbType(dbType);
            if (rows.length) {
                buttonsHtml += buildScheduleButtonHtml({
                    popupKey: dbType,
                    meta: SCHEDULE_BTN_META[dbType],
                    rows: rows
                });
            }
        });
    }

    if (!buttonsHtml) {
        $area.hide().empty();
        $('#transport-schedule-section').hide();
        return;
    }

    $area.html('<div class="schedule-btn-row">' + buttonsHtml + '</div>').css('display', 'flex');
    $('#transport-schedule-section').show();
}

function buildScheduleButtonHtml(config) {
    var meta = config.meta;
    var rows = config.rows || [];
    if (!meta || !rows.length) return '';

    return (
        '<button type="button" class="schedule-open-btn ' + meta.cssClass + '"' +
        ' onclick="openSchedulePopup(\'' + config.popupKey + '\')">' +
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

// 시간표 하단 시트 열기
function openSchedulePopup(popupKey) {
    var popup = getSchedulePopupData(popupKey);
    if (!popup.rows.length) return;

    var meta = popup.meta;
    var $overlay = $('#schedule-modal-overlay');
    var $body = $('#schedule-modal-body');

    $('#schedule-modal-title').text(popup.title);
    $('#schedule-modal-table-wrap').html(buildScheduleTableHtml(popup.rows, true));
    $('#schedule-modal-box')
        .removeClass(SCHEDULE_HEADER_CLASSES)
        .addClass(meta.cssClass || '');

    $body.scrollTop(0);
    $overlay.removeClass('open');
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            $overlay.addClass('open');
        });
    });
}

function closeSchedulePopup() {
    $('#schedule-modal-overlay').removeClass('open');
}

function buildScheduleBlock(dbType, rows, showArrive) {
    var title = SCHEDULE_BLOCK_TITLE[dbType] || (dbType + ' 운행 시간표');

    return (
        '<div class="schedule-block">' +
        '<div class="schedule-block-title">' + escapeHtml(title) + '</div>' +
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
    $title.text(dest.name + ' 방면 버스');
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
                '<span class="bus-stop">' + bus.stopNm + '(' + bus.remark + ')' + '</span>' +
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
