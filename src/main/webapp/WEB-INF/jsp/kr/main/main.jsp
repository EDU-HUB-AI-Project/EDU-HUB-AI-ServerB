<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>메인페이지</title>
<link rel="stylesheet" href="/resources/lib/bootstrap.min.css">
<link rel="stylesheet" href="/resources/common/common.css">
<script src="/resources/lib/jquery-4.0.0.min.js"></script>
<script src="/resources/lib/bootstrap.min.js"></script>
<script src="/resources/common/common.js"></script>
<script src="/resources/badge/badge.js"></script>
</head>
<body>

    <div id="loading-overlay">
        <div id="loading-box">
            <div class="spinner-border text-light mb-3" role="status"></div>
            <p>처리중입니다.<br>잠시만 기다려주세요.</p>
        </div>
    </div>

    <div id="intro-overlay">
        <div id="intro-title">
            🏫 교육생 키오스크
        </div>
        <div id="intro-subtitle">스마트 EDU-HUB AI 키오스크</div>
        <div id="intro-buttons">
            <button type="button" class="intro-btn" onclick="selectMenu('/badge.do', '명찰 발급 및 개인 맞춤 안내')">
                🪪<br>명찰 발급 및<br>개인 맞춤 안내
            </button>
            <button type="button" class="intro-btn" onclick="selectMenu('/facility.do', '보편적 시설 및 정보 안내')">
                🏢<br>보편적 시설 및<br>정보 안내
            </button>
            
        </div>
    </div>

    <%@ include file="/WEB-INF/jsp/kr/common/header.jsp" %>

    <div id="content-area"></div>

    <%@ include file="/WEB-INF/jsp/kr/common/footer.jsp" %>
</body>
</html>