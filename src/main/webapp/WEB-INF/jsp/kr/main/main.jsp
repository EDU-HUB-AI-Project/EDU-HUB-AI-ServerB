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
</head>
<body>

    <!-- 처음 화면 오버레이 -->
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

    <!-- 일반 화면 -->
    <%@ include file="/WEB-INF/jsp/kr/common/header.jsp" %>

    <div id="content-area"></div>

    <%@ include file="/WEB-INF/jsp/kr/common/footer.jsp" %>
</body>
</html>