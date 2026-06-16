<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script>
    var KIOSK_SITE = '${kioskSite}';
</script>

<div id="guide-container">
    <div class="contents-wrap">

    <div class="title-wrap guide-header">
        <h2><span id="card-name" class="title-name"></span> 교육생 <span>안내</span></h2>
    </div>

    <div class="subpage-body">

        <div class="guide-compact-row">
            <!-- 교육 정보 -->
            <div class="guide-card">
                <div class="card-body">
                    <h3 class="guide-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                        </svg>
                        교육 정보
                    </h3>
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
            </div>

            <!-- 생활관 안내 -->
            <div class="guide-card">
                <div class="card-body">
                    <h3 class="guide-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M10 12h4"/>
                            <path d="M10 8h4"/>
                            <path d="M14 21v-3a2 2 0 0 0-4 0v3"/>
                            <path d="M6 10H4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-9a2 2 0 0 0-2-2h-2"/>
                            <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
                        </svg>
                        생활관 안내
                    </h3>
                    <div class="info-row">
                        <div class="info-block">
                            <div class="info-label">배정 호실</div>
                            <div class="info-value" id="card-dorm"></div>
                        </div>
                        <div id="dorm-map-btn-wrap" style="display:none;">
                            <button type="button" id="dorm-map-btn" onclick="openDormModal()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z"/>
                                    <path d="M12 12l9-4.5M12 12v9M12 12L3 7.5"/>
                                </svg>
                                도면 보기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 강의실 안내 -->
        <div class="guide-card card-room">
            <div class="card-body">
                <h3 class="guide-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    강의실 안내
                </h3>
                <div id="subject-list-area"></div>
                <div id="classroom-map-area" style="display:none;">
                    <div id="svg-container"></div>
                </div>
                <div id="classroom-map-fallback" style="display:none;">
                    해당 강의실 도면 정보가 없습니다.
                </div>
            </div>
        </div>

        <div class="contact-notice">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>정보가 다르다면 <strong>${contactLocation}</strong> (${contactPhone})으로 문의하세요.</span>
        </div>

    </div>
    </div>
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
