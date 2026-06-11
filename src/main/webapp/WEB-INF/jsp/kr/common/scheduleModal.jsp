<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="schedule-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="schedule-modal-title">
    <div id="schedule-modal-box">
        <div class="schedule-modal-inner">
            <div class="schedule-modal-handle" aria-hidden="true"></div>
            <div class="schedule-modal-header-inner">
                <h2 id="schedule-modal-title"></h2>
                <button type="button" id="schedule-modal-close" aria-label="닫기">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div id="schedule-modal-body">
                <div id="schedule-modal-table-wrap"></div>
            </div>
            <div id="schedule-modal-footer">
                <button type="button" id="schedule-modal-close-btn">닫기</button>
            </div>
        </div>
    </div>
</div>
