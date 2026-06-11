<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="cafeteria-container">
    <div class="contents-wrap">

        <div class="title-wrap" id="cafeteria-title">
            <h2>구내식당 <span>안내</span></h2>
            <!-- <div class="guide-box guide-box--sub">
                <p>식당 위치와 오늘의 메뉴를 확인할 수 있습니다.</p>
            </div> -->
        </div>

        <div class="subpage-body">
    <!-- 사진 갤러리 (신규 추가) -->
    <div class="photo-gallery">
        <div class="gallery-item gallery-main">
            <img src="/images/cafeteria_area/20260526_154712.jpg"
                alt="구내식당 내부" class="gallery-img">
            <div class="photo-overlay">
                <span class="photo-label">식당 전경</span>
            </div>
        </div>
        <div class="gallery-item gallery-sub">
            <img src="/images/cafeteria_area/20260526_131843.jpg"
                alt="식사 중인 모습" class="gallery-img">
            <div class="photo-overlay">
                <span class="photo-label">식사 공간</span>
            </div>
        </div>
    </div>

    <!-- 운영 정보 (원본 id 유지) -->
    <div id="cafeteria-info">
        <div class="info-item">
            <div class="info-icon icon-box icon-box-sm icon-soft-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
            </div>
            <div class="info-content">
                <span class="info-label">위치</span>
                <span class="info-value">본관 1층</span>
            </div>
        </div>
        <div class="info-item">
            <div class="info-icon icon-box icon-box-sm icon-soft-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
            </div>
            <div class="info-content">
                <span class="info-label">문의</span>
                <span class="info-value">051-000-0000</span>
            </div>
        </div>
        <div class="info-item">
            <div class="info-icon icon-box icon-box-sm icon-soft-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            </div>
            <div class="info-content">
                <span class="info-label">운영시간</span>
                <span class="info-value">07:00 - 19:30</span>
            </div>
        </div>
    </div>

    <!-- 식단 테이블 (원본 id + c:forEach 유지) -->
    <div id="meal-table">
        <h2 class="section-title">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>오늘의 식단</span>
        </h2>
        <div class="menu-table-wrapper">
            <table class="menu-table">
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>운영시간</th>
                        <th>메뉴</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 이용 안내 (신규 추가) -->
    <div class="notice-section">
        <h3 class="notice-title">이용 안내</h3>
        <ul class="notice-list">
            <li class="notice-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>교육생도 요금을 지불해야합니다</span>
            </li>
            <li class="notice-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>명찰을 착용하고 입장해주세요</span>
            </li>
            <li class="notice-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>식사 후 식기는 정리대에 반납해주세요</span>
            </li>
            <li class="notice-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>식단은 매주 월요일에 변경됩니다</span>
            </li>
        </ul>
    </div>

        </div>
    </div>
</div>
<c:if test="${serverError}">
<script>
    document.addEventListener('DOMContentLoaded', function() {
        showAlert('서버 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.');
    });
</script>
</c:if>
<script>
    if (typeof initCafeteria === 'function') {
        initCafeteria();
    }
</script>