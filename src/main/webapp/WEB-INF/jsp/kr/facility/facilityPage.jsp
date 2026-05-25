<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/facility/facility.css">

<div id="facility-container">

    <div id="facility-title">🏢 시설 및 교통 정보 안내</div>

    <div id="facility-menu">

        <button type="button" class="facility-btn" onclick="loadPage('/facility/cafeteria.do')">
            <span class="fac-icon">🍽️</span>
            <span class="fac-name">구내식당</span>
            <span class="fac-desc">메뉴 및 운영시간 안내</span>
        </button>

        <button type="button" class="facility-btn" onclick="loadPage('/facility/smoking.do')">
            <span class="fac-icon">🚬</span>
            <span class="fac-name">흡연장소</span>
            <span class="fac-desc">흡연 구역 위치 안내</span>
        </button>

        <button type="button" class="facility-btn" onclick="loadPage('/facility/classroom.do')">
            <span class="fac-icon">🏫</span>
            <span class="fac-name">강의실 안내</span>
            <span class="fac-desc">교육 과정별 강의실 배치도</span>
        </button>

        <button type="button" class="facility-btn" onclick="loadPage('/facility/transport.do')">
            <span class="fac-icon">🚆</span>
            <span class="fac-name">교통정보</span>
            <span class="fac-desc">KTX · 시외버스 이동 안내</span>
        </button>

    </div>

</div>

<script src="/resources/facility/facility.js"></script>