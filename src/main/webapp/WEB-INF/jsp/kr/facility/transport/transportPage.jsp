<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/transport/transport.css">

<div id="transport-container">

    <div id="transport-title">
        🚆 교통 정보 안내
    </div>

    <div id="transport-content">

        <%-- 지도 영역 --%>
        <div id="map"></div>

        <%-- 길찾기 버튼 --%>
        <div id="route-buttons">
            <button class="route-btn" onclick="searchRoute('station')">🚆 울산역(KTX)으로</button>
            <button class="route-btn" onclick="searchRoute('terminal')">🚌 고속버스터미널로</button>
        </div>

        <%-- 버스 안내 결과 --%>
        <div id="bus-result" style="display:none;">
            <div id="bus-result-title"></div>
            <div id="bus-card-list"></div>
        </div>

        <%-- 교통 정보 안내 --%>
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

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=eec8e69f7553e61a39348fff684dd5c6&autoload=false&libraries=services"></script>
<script src="/resources/transport/transport.js"></script>