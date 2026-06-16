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



            <div class="cafeteria-photo-grid">

                <div class="cafeteria-photo-item">

                    <img src="/images/cafeteria_area/20260526_154712.jpg"

                        alt="구내식당 내부" class="cafeteria-photo-img">

                    <div class="cafeteria-photo-label">식당 전경</div>

                </div>

                <div class="cafeteria-photo-item">

                    <img src="/images/cafeteria_area/20260526_131843.jpg"

                        alt="식사 공간" class="cafeteria-photo-img">

                    <div class="cafeteria-photo-label">식사 공간</div>

                </div>

            </div>



            <div id="cafeteria-info" class="info-cards">

                <div class="info-card">

                    <div class="info-icon icon-box icon-box-md icon-subtle" aria-hidden="true">

                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">

                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>

                            <circle cx="12" cy="10" r="3"/>

                        </svg>

                    </div>

                    <div class="info-content">

                        <div class="info-label">위치</div>

                        <div class="info-value">본관 1층</div>

                    </div>

                </div>

                <div class="info-card">

                    <div class="info-icon icon-box icon-box-md icon-subtle" aria-hidden="true">

                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">

                            <circle cx="12" cy="12" r="10"/>

                            <polyline points="12 6 12 12 16 14"/>

                        </svg>

                    </div>

                    <div class="info-content">

                        <div class="info-label">운영시간</div>

                        <div class="info-value">07:00 - 19:30</div>

                    </div>

                </div>

            </div>



            <div id="meal-table" class="cafeteria-meal-section">

                <h3 class="cafeteria-section-title">

                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">

                        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>

                        <path d="M7 2v20"/>

                        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>

                    </svg>

                    <span>오늘의 식단</span>

                </h3>

                <div class="cafeteria-menu-card">

                    <table class="menu-table">

                        <thead>

                            <tr>

                                <th>구분</th>

                                <th>운영시간</th>

                                <th>메뉴</th>

                            </tr>

                        </thead>

                        <tbody></tbody>

                    </table>

                </div>

            </div>



            <div class="cafeteria-notice-card">

                <h3 class="cafeteria-section-title">

                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">

                        <circle cx="12" cy="12" r="10"/>

                        <line x1="12" y1="8" x2="12" y2="12"/>

                        <line x1="12" y1="16" x2="12.01" y2="16"/>

                    </svg>

                    <span>이용 안내</span>

                </h3>

                <ul class="cafeteria-notice-list">

                    <li class="cafeteria-notice-item">식당 내에서 식권을 발급해 사용해주세요</li>

                    <li class="cafeteria-notice-item">식사 후 식기는 식기반납대로 반납해 주세요</li>

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

