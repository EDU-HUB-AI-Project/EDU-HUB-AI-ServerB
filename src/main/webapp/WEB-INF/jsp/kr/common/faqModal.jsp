<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="faq-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="faq-modal-title">
    <div id="faq-modal-box">
        <div class="faq-modal-inner">
            <div class="faq-modal-handle" aria-hidden="true"></div>
            <div class="faq-modal-header">
                <h2 id="faq-modal-title">자주 찾는 질문</h2>
                <button type="button" id="faq-modal-close" aria-label="닫기">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div id="faq-modal-thinking" class="faq-modal-thinking" aria-live="polite">
                <div class="faq-thinking-bubble">
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                </div>
                <p class="faq-thinking-text">답변을 준비하고 있어요</p>
            </div>
            <div id="faq-modal-body" class="faq-modal-body">
                <div id="faq-accordion-list" class="faq-accordion-list"></div>
            </div>
        </div>
    </div>
</div>
