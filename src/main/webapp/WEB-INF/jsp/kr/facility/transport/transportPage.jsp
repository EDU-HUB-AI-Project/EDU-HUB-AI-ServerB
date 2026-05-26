<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/transport/transport.css">

<div id="transport-container">

    <div id="transport-title">🚆 교통 정보 안내</div>

    <div id="transport-content">

        <div id="map-transport"></div>

        <div id="route-buttons">
            <button class="route-btn" onclick="searchRoute('station')">
                🚆<span>울산역(KTX)</span>
            </button>
            <button class="route-btn" onclick="searchRoute('taehwa')">
                🚃<span>태화강역</span>
            </button>
            <button class="route-btn" onclick="searchRoute('terminal')">
                🚌<span>버스터미널</span>
            </button>
            <button class="route-btn" onclick="searchRoute('airport')">
                ✈️<span>울산공항</span>
            </button>
        </div>

        <div id="bus-result">
            <div id="bus-result-title"></div>
            <div id="bus-card-list"></div>
        </div>

        <div id="transport-info">

            <!-- 울산역(KTX) -->
            <div class="route-card route-card-ktx" data-type="station">
                <div class="route-card-header blue">🚆 교육원 → 울산역(KTX)</div>
                <div class="route-card-body">
                    <div class="stop-label">
                        📍 동서발전 정류장 <strong>11415</strong>
                        <span class="stop-tag cross">길 건너</span>
                        <div class="stop-sub">도로 건너 맞은편 정류장</div>
                    </div>
                    <div class="bus-route-row">
                        <span class="bus-badge">급행 5005</span>
                        <span class="bus-route-dest">울산역 하차</span>
                        <span class="bus-route-time">약 34분</span>
                    </div>
                </div>
            </div>

            <!-- 태화강역 -->
            <div class="route-card route-card-taehwa" data-type="taehwa">
                <div class="route-card-header blue">🚃 교육원 → 태화강역</div>
                <div class="route-card-body">
                    <div class="terminal-routes">
                        <div class="terminal-route">
                            <div class="stop-label">
                                📍 동서발전 정류장 <strong>11414</strong>
                                <span class="stop-tag near">후문 앞</span>
                                <div class="stop-sub">나오자마자 바로 탑승</div>
                            </div>
                            <div class="bus-route-row">
                                <span class="bus-badge">순환 32</span>
                                <span class="bus-badge">217번</span>
                                <span class="bus-route-dest">태화강역 하차</span>
                            </div>
                            <div class="route-time">⏱ 약 30분</div>
                        </div>
                        <div class="terminal-divider"></div>
                        <div class="terminal-route">
                            <div class="stop-label">
                                📍 동서발전 정류장 <strong>11415</strong>
                                <span class="stop-tag cross">길 건너</span>
                                <div class="stop-sub">도로 건너 맞은편 정류장</div>
                            </div>
                            <div class="bus-route-row">
                                <span class="bus-badge">712번</span>
                                <span class="bus-badge">728번</span>
                                <span class="bus-route-dest">태화강역 하차</span>
                            </div>
                            <div class="route-time">⏱ 약 30분</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 시외버스터미널 -->
            <div class="route-card route-card-terminal" data-type="terminal">
                <div class="route-card-header green">🚌 교육원 → 시외버스터미널</div>
                <div class="route-card-body">
                    <div class="terminal-routes">
                        <div class="terminal-route">
                        <div class="stop-label">
                            📍 동서발전 정류장 <strong>11414</strong>
                            <span class="stop-tag near">후문 앞</span>
                            <div class="stop-sub">나오자마자 바로 탑승</div>
                        </div>
                            <div class="bus-route-row">
                                <span class="bus-badge">217번</span>
                                <span class="bus-route-dest">고속버스터미널앞 하차</span>
                            </div>
                            <div class="route-time">⏱ 약 19분</div>
                        </div>
                        <div class="terminal-divider"></div>
                        <div class="terminal-route">
                            <div class="stop-label">
                                📍 동서발전 정류장 <strong>11415</strong>
                                <span class="stop-tag cross">길 건너</span>
                                <div class="stop-sub">도로 건너 맞은편 정류장</div>
                            </div>
                            <div class="bus-route-row">
                                <span class="bus-badge">712번</span>
                                <span class="bus-badge">728번</span>
                                <span class="bus-route-dest">시외고속버스터미널 하차</span>
                            </div>
                            <div class="route-time">⏱ 약 25분</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 울산공항 -->
            <div class="route-card route-card-airport" data-type="airport">
                <div class="route-card-header gold">✈️ 교육원 → 울산공항</div>
                <div class="route-card-body">
                    <div class="stop-label">
                        📍 동서발전 정류장 <strong>11414</strong>
                        <span class="stop-tag near">후문 앞</span>
                        <div class="stop-sub">나오자마자 바로 탑승</div>
                    </div>
                    <div class="bus-route-row">
                        <span class="bus-badge">급행 5005</span>
                        <span class="bus-route-dest">울산공항 하차</span>
                        <span class="bus-route-time">약 11분</span>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>

<script>
    initTransportMap();
</script>