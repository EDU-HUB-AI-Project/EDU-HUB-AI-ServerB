<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="faq-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="faq-modal-title">
    <div id="faq-chat-panel">
        <div class="faq-chat-header">
            <div class="faq-chat-header-info">
                <div>
                    <h2 id="faq-modal-title">키오스크 안내</h2>
                    <p class="faq-chat-status">궁금한 것을 선택해주세요</p>
                </div>
            </div>
            <button type="button" id="faq-modal-close" aria-label="닫기">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <div id="faq-chat-messages" class="faq-chat-messages" aria-live="polite"></div>
        <div id="faq-chat-chips" class="faq-chat-chips" aria-label="자주 묻는 질문"></div>
    </div>
</div>
