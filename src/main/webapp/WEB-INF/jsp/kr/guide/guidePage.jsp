<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/guide/guide.css">
<script>
    var KIOSK_SITE = '${kioskSite}';
</script>

<div id="guide-container">

    <div id="guide-title">🪪 <span id="card-name"></span> 교육생 안내</div>

    <!-- 교육 정보 -->
    <div class="guide-card card-edu">
        <div class="guide-card-header">📚 교육 정보</div>
        <div class="guide-card-body">
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

    <!-- 강의실 안내 -->
    <div class="guide-card card-room">
        <div class="guide-card-header">🏫 강의실 안내</div>
        <div class="guide-card-body">
            <div class="info-row">
                <div class="info-block">
                    <div class="info-label">강의실</div>
                    <div class="info-value" id="card-room"></div>
                </div>
                <div class="info-block">
                    <div class="info-label">층</div>
                    <div class="info-value" id="card-floor"></div>
                </div>
            </div>
            <div id="classroom-map-area" style="display:none;">
                <div id="svg-container"></div>
            </div>
            <div id="classroom-map-fallback" style="display:none;">
                해당 강의실 도면 정보가 없습니다.
            </div>
        </div>
    </div>

    <!-- 생활관 안내 -->
    <div class="guide-card card-dorm">
        <div class="guide-card-header">🏠 생활관 안내</div>
        <div class="guide-card-body">
            <div class="info-row" style="align-items: center;">
                <div class="info-block">
                    <div class="info-label">배정 호실</div>
                    <div class="info-value" id="card-dorm"></div>
                </div>
                <div id="dorm-map-btn-wrap" style="display:none;">
                    <button type="button" id="dorm-map-btn" onclick="openDormModal()">
                        🗺️ 도면 보기
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 처음으로 버튼 -->
    <button type="button" id="back-btn" onclick="goHome()">
        🏠 처음으로
    </button>

</div>


<div id="dorm-modal-overlay" onclick="closeDormModal()">
    <div id="dorm-modal-box" onclick="event.stopPropagation()">
        <div id="dorm-modal-header">
            <span id="dorm-modal-title">생활관 도면</span>
            <button type="button" id="dorm-modal-close" onclick="closeDormModal()">✕</button>
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