<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>스마트 EDU-HUB AI 키오스크</title>

<link rel="stylesheet" href="/resources/lib/bootstrap.min.css">
<link rel="stylesheet" href="/resources/common/common.css">
<link rel="stylesheet" href="/resources/common/header.css">
<link rel="stylesheet" href="/resources/main/main.css">
<script src="/resources/lib/jquery-4.0.0.min.js"></script>
<script src="/resources/lib/bootstrap.min.js"></script>
<script src="/resources/common/common.js"></script>
<script src="/resources/common/modal.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services"></script>

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
            <div class="spinner-border text-light mb-3" role="status"></div>
            <p>처리중입니다.<br>잠시만 기다려주세요.</p>
        </div>
    </div>

    <div id="intro-container">
        <div class="bg-decoration bg-decoration-1"></div>
        <div class="bg-decoration bg-decoration-2"></div>
        <div class="bg-grid"></div>

        <div class="intro-content">
            <div class="intro-header">
                <div class="header-badge">
                    <span class="badge-dot"></span>  <%-- 왼쪽 dot 추가 --%>
                    <span class="badge-text">SMART EDU-HUB</span>
                    <span class="badge-dot"></span>  <%-- 오른쪽 dot 추가 --%>
                </div>
                <h1 class="intro-title">EDU-HUB</h1>
                <div class="title-divider"></div>
            </div>

            <div class="intro-menu">
                <div class="menu-card" onclick="selectMenu('/badge.do')">
                    <div class="card-glow"></div>
                    <div class="card-content">
                        <div class="card-icon">
                            <div class="icon-box icon-blue">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                                    <circle cx="8" cy="9" r="2"/>
                                    <path d="M4 18h16M8 15v3M16 15v3"/>
                                </svg>
                            </div>
                        </div>
                        <div class="card-text">
                            <div class="card-number">
                                <span>01</span>
                                <div class="number-line"></div>
                            </div>
                            <h2 class="card-title">명찰 발급 및<br>개인 맞춤 안내</h2>
                            <p class="card-description">생년월일을 입력하여 명찰을 발급받고 개인 맞춤 안내를 받아보세요.</p>
                        </div>
                        <div class="card-arrow">
                            <div class="arrow-circle">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="menu-card" onclick="selectMenu('/facility.do')">
                    <div class="card-glow card-glow-green"></div>
                    <div class="card-content">
                        <div class="card-icon">
                            <div class="icon-box icon-green">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9 22 9 12 15 12 15 22"/>
                                </svg>
                            </div>
                        </div>
                        <div class="card-text">
                            <div class="card-number">
                                <span>02</span>
                                <div class="number-line"></div>
                            </div>
                            <h2 class="card-title">보편적 시설 및<br>정보 안내</h2>
                            <p class="card-description">교육 시설, 강의실, 편의시설 등 다양한 시설 정보를 안내해드립니다.</p>
                        </div>
                        <div class="card-arrow">
                            <div class="arrow-circle">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="intro-footer">
                <div class="footer-dot"></div>
                <span class="footer-text">스마트 EDU-HUB AI 키오스크</span>
            </div>
        </div>
    </div>
</div>

    <%@ include file="/WEB-INF/jsp/kr/common/header.jsp" %>

    <div id="content-area"></div>

    <%@ include file="/WEB-INF/jsp/kr/common/footer.jsp" %>

    <div id="common-modal">
        <div id="common-modal-box">
            <div id="modal-header">안내</div>
            <div id="modal-body"></div>
            <div id="modal-footer"></div>
        </div>
    </div>
</body>
</html>