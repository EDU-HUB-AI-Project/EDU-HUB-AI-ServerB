<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/css/facility.css">

<div id="facility-container">

    <div id="facility-title">
        🏢 시설 및 교통 정보 안내
    </div>

    <div id="facility-menu">

        <button type="button" class="facility-btn" onclick="location.href='/facility/cafeteria.do'">
            🍽️ 구내식당
            <p>메뉴 및 위치 안내</p>
        </button>

        <button type="button" class="facility-btn" onclick="location.href='/facility/smoking.do'">
            🚬 흡연장소
            <p>흡연 구역 위치 안내</p>
        </button>

        <button type="button" class="facility-btn" onclick="location.href='/facility/classroom.do'">
            🏫 강의실 안내
            <p>교육 과정별 강의실 배치도</p>
        </button>

        <button type="button" class="facility-btn" onclick="location.href='/facility/transport.do'">
            🚆 교통정보
            <p>KTX · 시외버스 이동 안내</p>
        </button>

    </div>

</div>

<script src="/resources/js/facility.js"></script>