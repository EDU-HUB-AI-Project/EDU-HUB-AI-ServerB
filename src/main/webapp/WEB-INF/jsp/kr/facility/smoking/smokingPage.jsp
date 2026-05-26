<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/smoking/smoking.css">

<div id="smoking-container">

    <!-- 헤더 (원본 id 유지) -->
    <div id="smoking-title">
        <div class="header-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 12h2a2 2 0 012 2v1a2 2 0 01-2 2H2M2 12h14M18 8c0-2.2-1.8-4-4-4"/>
            </svg>
            <span class="badge-text">Smoking Area Guide</span>
        </div>
        <h1 class="page-title">흡연장소 안내</h1>
    </div>

    <!-- 지도 영역 (원본 id 유지) -->
    <div class="map-section">
        <div id="smoking-map"></div>
    </div>

    <!-- 정보 카드 (신규 추가) -->
    <div class="info-section">
        <h2 class="section-title">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>흡연구역 안내</span>
        </h2>
        <div class="info-cards">
            <div class="info-card card-gray">
                <div class="info-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                </div>
                <div class="info-content">
                    <div class="info-label">위치</div>
                    <div class="info-value">건물 외부 지정구역</div>
                </div>
            </div>
            <div class="info-card card-gray">
                <div class="info-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                </div>
                <div class="info-content">
                    <div class="info-label">이용시간</div>
                    <div class="info-value">교육 휴식시간</div>
                </div>
            </div>
            <div class="info-card card-gray">
                <div class="info-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                </div>
                <div class="info-content">
                    <div class="info-label">대상</div>
                    <div class="info-value">흡연자 교육생</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 흡연장 사진 (원본 id 유지) -->
<div class="photo-section">
    <div id="smoking-photos">
        <div class="section-title">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span id="photo-title"></span>
        </div>

        <div id="photo-container" class="photo-gallery">
            <div class="gallery-item">
                <img id="smoking-photo-1" alt="흡연장 사진 1" class="gallery-img">
                <div class="photo-overlay">
                    <span class="photo-label">흡연구역 1</span>
                </div>
            </div>
            <div class="gallery-item">
                <img id="smoking-photo-2" alt="흡연장 사진 2" class="gallery-img">
                <div class="photo-overlay">
                    <span class="photo-label">흡연구역 2</span>
                </div>
            </div>
        </div>
    </div>
</div>

    <!-- 이용 안내 (신규 추가) -->
    <div class="notice-section">
        <h3 class="notice-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            이용 안내
        </h3>
        <ul class="notice-list">
            <li class="notice-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>지정된 흡연구역 외 흡연은 금지입니다</span>
            </li>
            <li class="notice-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>흡연 후 꽁초는 반드시 지정 용기에 버려주세요</span>
            </li>
            <li class="notice-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>비흡연자를 배려하여 이용해주세요</span>
            </li>
            <li class="notice-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>교육 시간 중 흡연은 삼가주세요</span>
            </li>
        </ul>
    </div>

</div>

<script src="/resources/smoking/smoking.js"></script>
<script>
    initSmokingMap();
</script>