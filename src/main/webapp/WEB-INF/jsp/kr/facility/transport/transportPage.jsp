<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel = "stylesheet" href= "/resources/css/transport.css">

<div id = "transport-container">

    <div id = "transport-title">
        🚆 교통 정보 안내
    </div>

    <div id = "transport-content">

        <%-- 지도 영역 --%>
        <div id = "map"></div>

        <%-- 교통 정보 안내 --%>
        <div id = "transport-info">
            <div class="info-card">
                <h3>📍 교육원 위치</h3>
                <p>울산광역시 중구 종가로 400(성안동)</p>
                <p>우편번호 : 44429</p>
            </div>
            <div class="info-card">
                <h3>🚇 대중교통</h3>
                <p>울산역(KTX)에서 약 20분</p>
                <p>울산고속버스터미널에서 약 15분</p>
            </div>
            <div class="info-card">
                <h3>🚌 버스</h3>
                <p>종가로 정류장 하차</p>
            </div>

        </div>
    </div>

</div>
<script>
    kakao.maps.load(function() {
        var coords = new kakao.maps.LatLng(35.564887329486496, 129.32046843019748);
        var container = document.getElementById('map');
        var options = {
            center: coords,
            level: 3
        };
        var map = new kakao.maps.Map(container, options);
        var marker = new kakao.maps.Marker({
            position: coords
        });
        marker.setMap(map);
        var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:5px; font-size:12px; font-weight:bold;">한국산업안전보건교육원</div>'
        });
        infowindow.open(map, marker);
    });
</script>
