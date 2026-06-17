<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="facility-container">
    <div class="contents-wrap">
        <div class="title-wrap">
            <h2>시설 <span>안내</span></h2>
            <div class="guide-box guide-box--sub">
                <p>원하는 안내 항목을 선택해주세요.</p>
            </div>
        </div>

        <div class="btn-wrap btn-wrap--animate facility-menu-grid">
            <button type="button" class="facility-menu-card" onclick="loadPage('/facility/classroom.do')">
                <span class="facility-menu-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z"/><path d="M12 12l9-4.5M12 12v9M12 12L3 7.5"/></svg>
                </span>
                <div class="facility-menu-text">
                    <p class="facility-menu-title">강의실 <span>위치</span></p>
                    <p class="card-description">강의실 배치도 및 안내</p>
                </div>
            </button>

            <button type="button" class="facility-menu-card" onclick="loadPage('/facility/location.do')">
                <span class="facility-menu-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div class="facility-menu-text">
                    <p class="facility-menu-title">시설 <span>위치</span></p>
                    <p class="card-description">편의시설·흡연구역 등</p>
                </div>
            </button>

            <button type="button" class="facility-menu-card" onclick="loadPage('/facility/cafeteria.do')">
                <span class="facility-menu-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>
                </span>
                <div class="facility-menu-text">
                    <p class="facility-menu-title">구내<span>식당</span></p>
                    <p class="card-description">메뉴 및 운영 안내</p>
                </div>
            </button>

            <button type="button" class="facility-menu-card" onclick="loadPage('/facility/transport.do')">
                <span class="facility-menu-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 14h.01M17 14h.01"/><path d="M6 19v2M18 19v2"/></svg>
                </span>
                <div class="facility-menu-text">
                    <p class="facility-menu-title">교통 <span>안내</span></p>
                    <p class="card-description">교통편 · 셔틀버스 안내</p>
                </div>
            </button>
        </div>
    </div>
</div>

<script src="/resources/facility/facility.js"></script>
