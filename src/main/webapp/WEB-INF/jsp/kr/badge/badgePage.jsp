<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/common/components.css">
<link rel="stylesheet" href="/resources/badge/badge.css">

<div id="badge-container">
    <div class="contents-wrap">

    <div id="step-keypad">
        <div class="title-wrap badge-header">
            <h2>명찰 <span>발급</span></h2>
            <div class="guide-box guide-box--sub" id="keypad-guide-box">
                <p id="keypad-guide-text">생년월일 6자리를 입력하세요 (예: 901225)</p>
            </div>
        </div>

        <div class="keypad-section">
            <div class="keypad-display-wrapper">
                <div class="display-glow"></div>
                <div class="keypad-display">
                    <div class="display-label" id="keypad-guide">
                        생년월일 6자리를 입력하세요
                        <span id="keypad-guide-ex">
                            예 : 901225 (1990년 12월 25일생)
                        </span>
                    </div>
                    <div id="input-display" class="input-area"></div>
                    <div class="progress-bar">
                        <div id="progress-fill" class="progress-fill"></div>
                        <span id="progress-text" class="progress-text">0 / 6</span>
                    </div>
                </div>
            </div>

            <div class="keypad-grid">
                <button class="key-btn" onclick="pressKey('1')">1</button>
                <button class="key-btn" onclick="pressKey('2')">2</button>
                <button class="key-btn" onclick="pressKey('3')">3</button>
                <button class="key-btn" onclick="pressKey('4')">4</button>
                <button class="key-btn" onclick="pressKey('5')">5</button>
                <button class="key-btn" onclick="pressKey('6')">6</button>
                <button class="key-btn" onclick="pressKey('7')">7</button>
                <button class="key-btn" onclick="pressKey('8')">8</button>
                <button class="key-btn" onclick="pressKey('9')">9</button>
                <button class="key-btn key-clear" onclick="clearKey()">전체삭제</button>
                <button class="key-btn" onclick="pressKey('0')">0</button>
                <button class="key-btn key-delete" onclick="deleteKey()">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5"></path>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
            </div>

            <button id="submit-btn" class="submit-btn" onclick="confirmKey()" disabled>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>조회</span>
            </button>
        </div>
    </div>

    <!-- 결과 확인 섹션 -->
    <div id="step-result">
        <div class="title-wrap badge-header">
            <h2>조회 <span>결과</span></h2>
            <div class="guide-box guide-box--sub">
                <p>목록에서 본인을 선택해 주세요.</p>
            </div>
        </div>

        <!-- 조회 결과 없음 -->
        <div id="no-result" class="no-result">
            <p>조회 결과가 없습니다.<br>생년월일을 다시 확인해주세요.</p>
            <button type="button" class="btn-cancel" onclick="goBackToKeypad()">← 다시 입력</button>
        </div>

        <!-- 결과 테이블 -->
        <div id="result-section" class="result-section">
            <div id="result-guide" class="result-guide">목록에서 본인을 선택해 주세요</div>
            <table id="result-table" class="result-table table table-hover table-bordered">
                <colgroup>
                    <col><col><col><col><col>
                </colgroup>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>교육과정</th>
                        <th>생활관</th>
                        <th>전화번호 뒷자리</th>
                    </tr>
                </thead>
                <tbody id="result-body"></tbody>
            </table>
        </div>

        <!-- 페이징 영역 -->
        <div id="pagination-area">
            <button id="prev-btn" class="page-btn" onclick="prevPage()">← 이전</button>
            <span id="page-info"></span>
            <button id="next-btn" class="page-btn" onclick="nextPage()">다음 →</button>
        </div>

        <!-- 선택 영역 -->
        <div id="selected-section" class="selected-section">
            <div id="selected-area" class="selected-info">
                <span>선택된 교육생 :</span>
                <strong id="selected-name"></strong>
                <span class="divider">|</span>
                <span>교육과정 :</span>
                <strong id="selected-edu"></strong>
            </div>
        </div>

        <!-- 하단 액션 버튼 -->
        <div id="result-actions" class="action-buttons">
            <button type="button" id="back-btn" class="btn-cancel" onclick="goBackToKeypad()">← 다시 입력</button>
            <button type="button" id="confirm-btn" class="btn-confirm" onclick="confirmStudent()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>확인</span>
            </button>
        </div>
    </div>

    </div>
</div>

<script>
    if (typeof initBadgePage === 'function') {
        initBadgePage();
    }
</script>