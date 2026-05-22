<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/guide/guide.css">
<script>
    var KIOSK_SITE = '${kioskSite}';
</script>
<div id="guide-container">

    <div id="guide-title">
        🪪 <span id="card-name"></span> 교육생 안내
    </div>

    <!-- 교육 정보 -->
    <div class="card border-primary mb-3">
        <div class="card-header bg-primary text-white fs-5">
            📚 교육 정보
        </div>
        <div class="card-body">
            <div class="row mt-2">
                <div class="col-6">
                    <div class="info-label">교육과정</div>
                    <div class="info-value" id="card-edu-name"></div>
                </div>
                <div class="col-6">
                    <div class="info-label">교육기간</div>
                    <div class="info-value" id="card-period"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- 강의실 안내 -->
    <div class="card border-success mb-3">
        <div class="card-header bg-success text-white fs-5">
            🏫 강의실 안내
        </div>
        <div class="card-body">
            <div class="row mt-2">
                <div class="col-6">
                    <div class="info-label">강의실</div>
                    <div class="info-value" id="card-room"></div>
                </div>
                <div class="col-6">
                    <div class="info-label">층</div>
                    <div class="info-value" id="card-floor"></div>
                </div>
            </div>
            <!-- 강의실 도면 하이라이트 -->
            <div id="classroom-map-area" class="mt-3" style="display:none;">
                <canvas id="classroom-canvas"></canvas>
            </div>
            <div id="classroom-map-fallback" class="mt-3 text-center text-muted" style="display:none;">
                해당 강의실 도면 정보가 없습니다.
            </div>
        </div>
    </div>

    <!-- 생활관 안내 -->
    <div class="card border-warning mb-3">
        <div class="card-header bg-warning fs-5">
            🏠 생활관 안내
        </div>
        <div class="card-body">
            <div class="mt-2">
                <div class="info-label">배정 호실</div>
                <div class="info-value" id="card-dorm"></div>
            </div>
        </div>
    </div>

    <!-- 처음으로 버튼 -->
    <button type="button" id="back-btn" class="btn btn-danger" onclick="goHome()">
        🏠 처음으로
    </button>

</div>

