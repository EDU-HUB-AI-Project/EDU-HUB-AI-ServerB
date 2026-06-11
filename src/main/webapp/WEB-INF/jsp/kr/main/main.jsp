<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>스마트 EDU-HUB AI 키오스크</title>

<link rel="stylesheet" href="/resources/common/common.css">
<link rel="stylesheet" href="/resources/common/components.css">
<link rel="stylesheet" href="/resources/common/header.css">
<link rel="stylesheet" href="/resources/main/main.css">
<link rel="stylesheet" href="/resources/badge/badge.css">
<link rel="stylesheet" href="/resources/facility/facility.css">
<link rel="stylesheet" href="/resources/cafeteria/cafeteria.css">
<link rel="stylesheet" href="/resources/location/location.css">
<link rel="stylesheet" href="/resources/transport/transport.css">
<link rel="stylesheet" href="/resources/classroom/classroom.css">
<link rel="stylesheet" href="/resources/guide/guide.css">
<script src="/resources/lib/jquery-4.0.0.min.js"></script>
<script src="/resources/common/toast.js"></script>
<script src="/resources/common/common.js"></script>
<script src="/resources/common/faq.js"></script>
<script src="/resources/common/modal.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services"></script>

<script src="/resources/badge/badge-validator.js"></script>
<script src="/resources/badge/badge.js"></script>
<script src="/resources/guide/guide.js"></script>
<script src="/resources/classroom/classroom.js"></script>
<script src="/resources/cafeteria/cafeteria.js"></script>
<script src="/resources/transport/transport.js"></script>
<script src="/resources/main/main.js"></script>

</head>
<body>

    <div id="loading-overlay">
        <div id="loading-box">
            <div class="loading-spinner" role="status" aria-label="로딩 중"></div>
            <p>처리중입니다.<br>잠시만 기다려주세요.</p>
        </div>
    </div>

    <div id="intro-container">
        <div class="inner">
            <div class="contents-wrap">
                <div class="title-wrap intro-title-wrap">
                    <h2>원하는<br><span>서비스</span>를<br>선택해주세요</h2>
                </div>

                <div class="main-contents-container">
                    <div class="btn-wrap btn-wrap-main">
                        <button type="button" class="btn-attendance" onclick="selectMenu('/badge.do')">
                            <span class="btn-icon" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
                            </span>
                            <p class="btn-label">명찰 발급</p>
                        </button>
                        <button type="button" class="btn-guide" onclick="selectMenu('/facility.do')">
                            <span class="btn-icon" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/></svg>
                            </span>
                            <p class="btn-label">시설 정보</p>
                        </button>
                    </div>
    
                    <div class="btn-quick-wrap">
                        <button type="button" class="btn-quick" onclick="selectShortcut('/facility/classroom.do')">강의실 위치</button>
                        <button type="button" class="btn-quick" onclick="selectShortcut('/facility/location.do')">시설 위치</button>
                        <button type="button" class="btn-quick" onclick="selectShortcut('/facility/cafeteria.do')">식당 메뉴</button>
                        <button type="button" class="btn-quick" onclick="selectShortcut('/facility/transport.do')">교통 정보</button>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <%@ include file="/WEB-INF/jsp/kr/common/header.jsp" %>

    <div id="content-area"></div>

    <%@ include file="/WEB-INF/jsp/kr/common/footer.jsp" %>
    <%@ include file="/WEB-INF/jsp/kr/common/toast.jsp" %>
    <%@ include file="/WEB-INF/jsp/kr/common/scheduleModal.jsp" %>
    <%@ include file="/WEB-INF/jsp/kr/common/faqModal.jsp" %>

    <div id="common-modal">
        <div id="common-modal-box">
            <div id="modal-header">안내</div>
            <div id="modal-body"></div>
            <div id="modal-footer"></div>
        </div>
    </div>
</body>
</html>
