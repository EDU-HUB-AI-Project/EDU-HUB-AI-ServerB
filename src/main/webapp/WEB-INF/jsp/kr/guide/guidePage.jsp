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
            <div class="info-block">
                <div class="info-label">배정 호실</div>
                <div class="info-value" id="card-dorm"></div>
            </div>
        </div>
    </div>

    <!-- 처음으로 버튼 -->
    <button type="button" id="back-btn" onclick="goHome()">
        🏠 처음으로
    </button>

</div>