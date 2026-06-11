<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<nav id="footer" class="kiosk-float-nav" aria-label="화면 이동">
    <div class="kiosk-float-nav-inner">
        <div class="kiosk-float-nav-brand" aria-hidden="true">
            <img src="/images/logo-edu-hub-ai.png" alt="EDU HUB AI">
        </div>
        <div class="kiosk-float-nav-start">
            <button type="button" id="footer-back-btn" class="kiosk-float-btn" onclick="handleFooterBack()" aria-label="이전 화면">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
            </button>
            <button type="button" id="footer-home-btn" class="kiosk-float-btn-pill" onclick="goHome()" aria-label="처음으로">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>처음으로</span>
            </button>
        </div>
        <button type="button" id="faq-fab" class="kiosk-faq-fab" onclick="toggleFaqPanel()" aria-label="자주 찾는 질문" aria-expanded="false">
            <span class="faq-fab-icon faq-fab-icon--dots" aria-hidden="true">
                <svg class="faq-fab-dots-icon" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <circle cx="5" cy="12" r="1.75"/>
                    <circle cx="12" cy="12" r="1.75"/>
                    <circle cx="19" cy="12" r="1.75"/>
                </svg>
            </span>
            <span class="faq-fab-icon faq-fab-icon--close" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </span>
        </button>
    </div>
</nav>
