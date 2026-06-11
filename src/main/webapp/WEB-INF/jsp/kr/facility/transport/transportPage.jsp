<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="transport-container">

    <div class="contents-wrap">



        <div class="title-wrap" id="transport-title">

            <h2>교통 <span>안내</span></h2>

            <!-- <p class="transport-subtitle">KTX · 시외버스 등 교통 정보를 확인할 수 있습니다.</p> -->

        </div>



        <div class="subpage-body" id="transport-content">



            <div id="route-buttons">

                <button type="button" class="route-btn active" data-route="shuttle" onclick="searchRoute('shuttle', this)">셔틀버스</button>

                <button type="button" class="route-btn" data-route="station" onclick="searchRoute('station', this)">울산역</button>

                <button type="button" class="route-btn" data-route="terminal" onclick="searchRoute('terminal', this)">버스터미널</button>

                <button type="button" class="route-btn" data-route="airport" onclick="searchRoute('airport', this)">울산공항</button>

                <button type="button" class="route-btn" data-route="taehwa" onclick="searchRoute('taehwa', this)">태화강역</button>

            </div>



            <div id="map-transport" aria-label="교통 안내 지도"></div>



            <div id="transport-info">

                <div class="route-card route-card-station" data-type="station">

                    <div class="route-card-header"><span class="route-card-title">교육원 → 울산역</span></div>

                    <div class="route-card-body">

                        <div class="stop-label">

                            동서발전 정류장 <strong>11415</strong>

                            <span class="stop-tag cross">길 건너</span>

                            <div class="stop-sub">도로 건너 맞은편 정류장 · KTX · SRT</div>

                        </div>

                        <div class="bus-route-row">

                            <span class="bus-badge">급행 5005</span>

                            <span class="bus-route-dest">울산역 하차</span>

                            <span class="bus-route-time">약 34분</span>

                        </div>

                    </div>

                </div>



                <div class="route-card route-card-taehwa" data-type="taehwa">

                    <div class="route-card-header"><span class="route-card-title">교육원 → 태화강역</span></div>

                    <div class="route-card-body">

                        <div class="terminal-routes">

                            <div class="terminal-route">

                                <div class="stop-label">

                                    동서발전 정류장 <strong>11414</strong>

                                    <span class="stop-tag near">후문 앞</span>

                                    <div class="stop-sub">나오자마자 바로 탑승</div>

                                </div>

                                <div class="bus-route-row">

                                    <span class="bus-badge">순환 32</span>

                                    <span class="bus-badge">217번</span>

                                    <span class="bus-route-dest">태화강역 하차</span>

                                </div>

                                <div class="route-time">약 30분</div>

                            </div>

                            <div class="terminal-divider"></div>

                            <div class="terminal-route">

                                <div class="stop-label">

                                    동서발전 정류장 <strong>11415</strong>

                                    <span class="stop-tag cross">길 건너</span>

                                    <div class="stop-sub">도로 건너 맞은편 정류장</div>

                                </div>

                                <div class="bus-route-row">

                                    <span class="bus-badge">712번</span>

                                    <span class="bus-badge">728번</span>

                                    <span class="bus-route-dest">태화강역 하차</span>

                                </div>

                                <div class="route-time">약 30분</div>

                            </div>

                        </div>

                    </div>

                </div>



                <div class="route-card route-card-terminal" data-type="terminal">

                    <div class="route-card-header"><span class="route-card-title">교육원 → 시외버스터미널</span></div>

                    <div class="route-card-body">

                        <div class="terminal-routes">

                            <div class="terminal-route">

                                <div class="stop-label">

                                    동서발전 정류장 <strong>11414</strong>

                                    <span class="stop-tag near">후문 앞</span>

                                    <div class="stop-sub">나오자마자 바로 탑승</div>

                                </div>

                                <div class="bus-route-row">

                                    <span class="bus-badge">217번</span>

                                    <span class="bus-route-dest">고속버스터미널앞 하차</span>

                                </div>

                                <div class="route-time">약 19분</div>

                            </div>

                            <div class="terminal-divider"></div>

                            <div class="terminal-route">

                                <div class="stop-label">

                                    동서발전 정류장 <strong>11415</strong>

                                    <span class="stop-tag cross">길 건너</span>

                                    <div class="stop-sub">도로 건너 맞은편 정류장</div>

                                </div>

                                <div class="bus-route-row">

                                    <span class="bus-badge">712번</span>

                                    <span class="bus-badge">728번</span>

                                    <span class="bus-route-dest">시외고속버스터미널 하차</span>

                                </div>

                                <div class="route-time">약 25분</div>

                            </div>

                        </div>

                    </div>

                </div>



                <div class="route-card route-card-airport" data-type="airport">

                    <div class="route-card-header"><span class="route-card-title">교육원 → 울산공항</span></div>

                    <div class="route-card-body">

                        <div class="stop-label">

                            동서발전 정류장 <strong>11414</strong>

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



                <div class="route-card route-card-shuttle active" data-type="shuttle">

                    <div class="route-card-header"><span class="route-card-title">교육원 셔틀버스</span></div>

                    <div class="route-card-body">

                        <div class="shuttle-route-summary" id="shuttle-route-summary">

                            셔틀버스 운행 시간표를 확인하세요.

                        </div>

                    </div>

                </div>

            </div>



            <div id="bus-result">

                <div id="bus-result-title"></div>

                <div id="bus-card-list"></div>

            </div>



            <div class="transport-schedule-section" id="transport-schedule-section">

                <h3 class="transport-section-label">운행 시간표</h3>

                <div id="transport-schedule-area"></div>

            </div>



        </div>

    </div>

</div>

