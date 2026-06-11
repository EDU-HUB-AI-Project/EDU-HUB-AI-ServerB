<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="header">
    <div class="header-container">
        <div class="header-content">
            <button type="button" class="header-logo" onclick="goHome()" aria-label="처음으로">
                <img src="/images/logo-edu-hub-ai.png" alt="EDU HUB AI">
            </button>
            <div class="header-time-wrap">
                <svg class="header-time-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                <time id="header-time" class="header-time" datetime=""></time>
            </div>
        </div>
    </div>
</div>
