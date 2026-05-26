<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/badge/badge.css">

<div id="badge-container">

    <!-- 키패드 입력 섹션 -->
    <div id="step-keypad">
        <div class="badge-header">
            <div class="header-badge">
                <span class="badge-dot"></span>
                <span class="badge-text">Badge Service</span>
                <span class="badge-dot"></span>
            </div>
            <h1 class="page-title" id="badge-title">명찰 발급</h1>
        </div>

        <div class="keypad-section">
            <div class="keypad-display-wrapper">
                <div class="display-glow"></div>
                <div class="keypad-display">
                    <div class="display-label" id="keypad-guide">
                        생년월일 6자리를 입력하세요 
                        <span id="keypad-guide-ex" style="display:block; font-size:14px; margin-top:8px; letter-spacing:0; font-weight:300; color:#94a3b8;">
                            예 : 901225 (1990년 12월 25일생)
                        </span>
                    </div>
                    <div id="input-display" class="input-area">
                        <div id="keypad-display"></div>
                    </div>
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

            <button id="submit-btn" class="submit-btn key-confirm" onclick="confirmKey()" disabled>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>조회</span>
            </button>
        </div>
    </div>

    <!-- 결과 확인 섹션 -->
    <div id="step-result" style="display:none;">
        <div class="badge-header">
            <div class="header-badge">
                <span class="badge-dot"></span>
                <span class="badge-text">Verification Result</span>
                <span class="badge-dot"></span>
            </div>
            <h1 class="page-title" id="result-title">조회 결과</h1>
        </div>

        <!-- 조회 결과 없음 -->
        <div id="no-result" class="no-result" style="display:none;">
            <p>조회 결과가 없습니다.<br>생년월일을 다시 확인해주세요.</p>
        </div>

        <!-- 결과 테이블 -->
        <div id="result-section" class="result-section">
            <table id="result-table" class="result-table table table-hover table-bordered" style="display:none;">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>교육과정</th>
                        <th>기숙사</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody id="result-body"></tbody>
            </table>
        </div>

        <!-- 페이징 영역 -->
        <div id="pagination-area" class="pagination-wrapper" style="display:none; text-align:center; margin: 32px 0;">
            <button id="prev-btn" class="page-btn btn-cancel" onclick="prevPage()" style="display:inline-flex; width:auto; height:56px; padding:0 24px; font-size:18px; margin-right:16px;">← 이전</button>
            <span id="page-info" style="font-size:20px; font-family:monospace; color:#64748b; vertical-align:middle; line-height:56px;"></span>
            <button id="next-btn" class="page-btn btn-cancel" onclick="nextPage()" style="display:inline-flex; width:auto; height:56px; padding:0 24px; font-size:18px; margin-left:16px;">다음 →</button>
        </div>

        <!-- 선택 영역 정보 알림 박스 -->
        <div id="selected-section" class="selected-section" style="display:none;">
            <div id="selected-area" class="selected-info">
                <span>선택된 교육생 :</span>
                <strong id="selected-name"></strong>
                <span class="divider">|</span>
                <span>교육과정 :</span>
                <strong id="selected-edu"></strong>
            </div>
        </div>

        <!-- 하단 액션 버튼 배치 그리드 -->
        <div id="result-actions" class="action-buttons" style="max-width:860px; margin:40px auto 0;">
            <button type="button" id="back-btn" class="btn-cancel" onclick="goBackToKeypad()" style="height:96px; font-size:26px;">
                ← 다시 입력
            </button>
            <button type="button" id="confirm-btn" class="btn-confirm" onclick="confirmStudent()" style="display:none; height:96px; font-size:26px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>확인</span>
            </button>
        </div>
    </div>

</div>

<script>
    if (typeof initBadgePage === 'function') {
        initBadgePage();
    }
</script>
