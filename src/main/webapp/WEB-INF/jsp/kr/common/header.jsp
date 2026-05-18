<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="header">
    <!-- 로고 영역 -->
    <div id="header-logo">
        🏫 교육생 키오스크
    </div>

    <!-- 네비게이션 버튼 -->
    <div id="header-nav">
        <button type="button" id="nav-badge" onclick="loadPage('/badge.do')">
            🪪 명찰 발급 및 개인 맞춤 안내
        </button>
        <button type="button" id="nav-facility" onclick="loadPage('/facility.do')">
            🏢 보편적 시설 및 정보 안내
        </button>
    </div>

    <!-- 홈 버튼 -->
    <div id="header-home">
        <button type="button" id="home-btn" onclick="goHome()">
            🏠 처음으로
        </button>
    </div>
</div>