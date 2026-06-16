<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="badge-container">
    <div class="contents-wrap">

    <div id="step-keypad">
        <div class="title-wrap badge-header">
            <h2><span>생년월일</span>을 <br>입력해주세요.</h2>
            <div class="guide-box guide-box--sub">
                <p>생년월일 6자리를 입력하세요 (예: 901225)</p>
            </div>
        </div>

        <div class="input-wrap" id="badge-input-wrap">
            <div id="birthDisplay" class="birth-display" aria-live="polite">
                <span class="digit empty cursor" data-idx="0"></span>
                <span class="digit empty" data-idx="1"></span>
                <span class="digit empty" data-idx="2"></span>
                <span class="digit empty" data-idx="3"></span>
                <span class="digit empty" data-idx="4"></span>
                <span class="digit empty" data-idx="5"></span>
            </div>
            <p id="validMsg" class="validMsg"></p>
        </div>

        <div class="badge-keypad-grid" id="btn-main">
            <button type="button" class="inputNum" data-num="1">1</button>
            <button type="button" class="inputNum" data-num="2">2</button>
            <button type="button" class="inputNum" data-num="3">3</button>
            <button type="button" class="inputNum" data-num="4">4</button>
            <button type="button" class="inputNum" data-num="5">5</button>
            <button type="button" class="inputNum" data-num="6">6</button>
            <button type="button" class="inputNum" data-num="7">7</button>
            <button type="button" class="inputNum" data-num="8">8</button>
            <button type="button" class="inputNum" data-num="9">9</button>
            <button type="button" id="backspaceBtn" class="btn-backspace" aria-label="한 글자 삭제">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                </svg>
            </button>
            <button type="button" class="inputNum" data-num="0">0</button>
            <button type="button" id="resetBtn" class="btn-reset" aria-label="전체 삭제">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                </svg>
            </button>
        </div>

        <button type="button" id="submit-btn" class="btn-search" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>
            </svg>
            <span>조회하기</span>
        </button>
    </div>

    <!-- 결과 확인 섹션 -->
    <div id="step-result">
        <div class="title-wrap badge-header" id="result-title-wrap">
            <h2 id="result-title">본인을 <span>선택</span>해주세요.</h2>
            <div class="guide-box guide-box--sub" id="result-guide-box">
                <p>생년월일을 기반으로 조회된 결과입니다.</p>
            </div>
        </div>

        <div id="no-result" class="badge-no-result">
            <h3 class="badge-none-msg">해당하는 교육생이 존재하지 않습니다.<br>생년월일을 확인 해주세요.</h3>
            <button type="button" class="btn-retry-birth" onclick="goBackToKeypad()">
                <span>생년월일 다시 입력하기</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>
                </svg>
            </button>
        </div>

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

        <div id="pagination-area">
            <button id="prev-btn" class="page-btn" onclick="prevPage()">← 이전</button>
            <span id="page-info"></span>
            <button id="next-btn" class="page-btn" onclick="nextPage()">다음 →</button>
        </div>

        <div id="selected-section" class="selected-section">
            <div id="selected-area" class="selected-info">
                <span>선택된 교육생 :</span>
                <strong id="selected-name"></strong>
                <span class="divider">|</span>
                <span>교육과정 :</span>
                <strong id="selected-edu"></strong>
            </div>
        </div>

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
    if (typeof initKeypad === 'function') {
        initKeypad();
    }
</script>
