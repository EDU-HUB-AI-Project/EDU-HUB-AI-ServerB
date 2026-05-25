<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/transport/transport.css">
<script>
    var KAKAO_MAP_KEY = '${kakaoMapKey}';
</script>

<div id="transport-container">

    <div id="transport-title">🚆 교통 정보 안내</div>

    <div id="transport-content">

        <div id="map-transport"></div>

        <div id="route-buttons">
            <button class="route-btn" onclick="searchRoute('station')">
                🚆 울산역(KTX)으로
            </button>
            <button class="route-btn" onclick="searchRoute('terminal')">
                🚌 고속버스터미널로
            </button>
        </div>

        <div id="bus-result">
            <div id="bus-result-title"></div>
            <div id="bus-card-list"></div>
        </div>

        <div id="transport-info">
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
    initTransportMap();
</script>