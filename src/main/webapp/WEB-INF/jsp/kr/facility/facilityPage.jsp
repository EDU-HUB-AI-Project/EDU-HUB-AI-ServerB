<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/facility/facility.css">

<div id="facility-container">

    <div class="facility-header">
        <div class="header-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z"/>
                <path d="M12 12l9-4.5M12 12v9M12 12L3 7.5"/>
            </svg>
            <span class="badge-text">Facility Information</span>
        </div>
        <h1 class="page-title">시설 안내</h1>
    </div>

    <div class="facility-menu">

        <button class="facility-card" onclick="loadPage('/facility/location.do')">
            <div class="card-hover-bg card-hover-gray"></div>
            <div class="card-content">
                <div class="card-left">
                    <div class="card-icon icon-gray">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                    </div>
                    <div class="card-text">
                        <h2 class="card-title">시설 위치</h2>
                        <p class="card-description">흡연·편의시설 등 위치 안내</p>
                    </div>
                </div>
                <div class="card-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </div>
            </div>
            <div class="card-bottom-line card-line-gray"></div>
        </button>

        <button class="facility-card" onclick="loadPage('/facility/cafeteria.do')">
            <div class="card-hover-bg card-hover-blue"></div>
            <div class="card-content">
                <div class="card-left">
                    <div class="card-icon icon-blue">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3z"/>
                        </svg>
                    </div>
                    <div class="card-text">
                        <h2 class="card-title">식당 메뉴</h2>
                        <p class="card-description">메뉴 및 운영 안내</p>
                    </div>
                </div>
                <div class="card-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </div>
            </div>
            <div class="card-bottom-line card-line-blue"></div>
        </button>

        <button class="facility-card" onclick="loadPage('/facility/classroom.do')">
            <div class="card-hover-bg card-hover-emerald"></div>
            <div class="card-content">
                <div class="card-left">
                    <div class="card-icon icon-emerald">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </div>
                    <div class="card-text">
                        <h2 class="card-title">강의실</h2>
                        <p class="card-description">교육 과정별 강의실 배치도</p>
                    </div>
                </div>
                <div class="card-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </div>
            </div>
            <div class="card-bottom-line card-line-emerald"></div>
        </button>

        <button class="facility-card" onclick="loadPage('/facility/transport.do')">
            <div class="card-hover-bg card-hover-purple"></div>
            <div class="card-content">
                <div class="card-left">
                    <div class="card-icon icon-purple">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="6" width="18" height="13" rx="2"/>
                            <path d="M3 10h18M7 14h.01M17 14h.01"/>
                            <path d="M6 19v2M18 19v2"/>
                        </svg>
                    </div>
                    <div class="card-text">
                        <h2 class="card-title">교통</h2>
                        <p class="card-description">KTX · 시외버스 이동 안내</p>
                    </div>
                </div>
                <div class="card-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </div>
            </div>
            <div class="card-bottom-line card-line-purple"></div>
        </button>

    </div>

</div>

<script src="/resources/facility/facility.js"></script>
