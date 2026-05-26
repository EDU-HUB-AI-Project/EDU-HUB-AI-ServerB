<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/guide/guide.css">
<script>
    var KIOSK_SITE = '${kioskSite}';
</script>

<div id="guide-container">

    <!-- 헤더 -->
    <div class="guide-header">
        <div class="header-badge">
            <span class="badge-dot"></span>
            <span class="badge-text">Personal Guide</span>
            <span class="badge-dot"></span>
        </div>
        <h1 class="page-title"><span id="card-name"></span> 교육생 안내</h1>
        <div class="title-divider"></div>
    </div>

    <!-- 카드 영역 -->
    <div class="guide-cards">

        <!-- 교육 정보 -->
        <div class="guide-card" style="animation-delay: 0.1s;">
            <div class="card-icon-wrap icon-blue">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
            </div>
            <div class="card-body">
                <div class="card-section-label label-blue">교육 정보</div>
                <div class="info-row">
                    <div class="info-block">
                        <div class="info-label">교육과정</div>
                        <div class="info-value" id="card-edu-name"></div>
                    </div>
                    <div class="info-block">
                        <div class="info-label">교육기간</div>
                        <div class="info-value" id="card-period"></div>
                    </div>
                </div>
            </div>
            <div class="card-bottom-line line-blue"></div>
        </div>

        <!-- 강의실 안내 -->
        <div class="guide-card card-room" style="animation-delay: 0.2s;">
            <div class="card-icon-wrap icon-emerald">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
            </div>
            <div class="card-body">
                <div class="card-section-label label-emerald">강의실 안내</div>
                <div class="info-row">
                    <div class="info-block">
                        <div class="info-label">강의실</div>
                        <div class="info-value">
                            <span id="card-room"></span>
                            <span id="card-floor-wrap"> · <span id="card-floor"></span></span>
                        </div>
                    </div>
                </div>
                <div id="classroom-map-area" style="display:none;">
                    <div id="svg-container"></div>
                </div>
                <div id="classroom-map-fallback" style="display:none;">
                    해당 강의실 도면 정보가 없습니다.
                </div>
            </div>
            <div class="card-bottom-line line-emerald"></div>
        </div>

        <!-- 생활관 안내 -->
        <div class="guide-card" style="animation-delay: 0.3s;">
            <div class="card-icon-wrap icon-amber">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M3 22V8l9-6 9 6v14"/>
                    <rect x="9" y="14" width="6" height="8"/>
                    <path d="M9 10h.01M15 10h.01"/>
                </svg>
            </div>
            <div class="card-body">
                <div class="card-section-label label-amber">생활관 안내</div>
                <div class="info-row" style="align-items: center;">
                    <div class="info-block">
                        <div class="info-label">배정 호실</div>
                        <div class="info-value" id="card-dorm"></div>
                    </div>
                    <div id="dorm-map-btn-wrap" style="display:none;">
                        <button type="button" id="dorm-map-btn" onclick="openDormModal()">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                                <line x1="9" y1="3" x2="9" y2="18"/>
                                <line x1="15" y1="6" x2="15" y2="21"/>
                            </svg>
                            도면 보기
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-bottom-line line-amber"></div>
        </div>

    </div>

    <!-- 잘못된 정보 안내 -->
    <div class="contact-notice">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>정보가 다르다면 <strong>${contactLocation}</strong> (${contactPhone})으로 문의하세요.</span>
    </div>

    <!-- 처음으로 버튼 -->
    <button type="button" id="back-btn" onclick="goHome()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>처음으로</span>
    </button>
</div>


<!-- 생활관 도면 모달 -->
<div id="dorm-modal-overlay" onclick="closeDormModal()">
    <div id="dorm-modal-box" onclick="event.stopPropagation()">
        <div id="dorm-modal-header">
            <span id="dorm-modal-title">생활관 도면</span>
            <button type="button" id="dorm-modal-close" onclick="closeDormModal()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <div id="dorm-modal-body">
            <div id="dorm-svg-container"></div>
            <div id="dorm-map-fallback" style="display:none;">
                해당 호실 도면 정보가 없습니다.
            </div>
        </div>
        <div id="dorm-modal-footer">
            <button type="button" id="dorm-modal-close-btn" onclick="closeDormModal()">닫기</button>
        </div>
    </div>
</div>