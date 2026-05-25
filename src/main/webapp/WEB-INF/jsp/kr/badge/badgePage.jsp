<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/badge/badge.css">

<div id="badge-container">

    <!-- 키패드 -->
    <div id="step-keypad">
        <div id="badge-title">🪪 명찰 발급 및 개인 맞춤 안내</div>
        <div id="keypad-guide">
            생년월일 6자리를 입력하세요
            <span id="keypad-guide-ex">예 &nbsp;:&nbsp; 901225 &nbsp;(1990년 12월 25일생)</span>
        </div>
        <div id="keypad-area">
            <div id="keypad-display"></div>
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
                <button class="key-btn key-delete" onclick="deleteKey()">←</button>
            </div>
            <button class="key-btn key-confirm" onclick="confirmKey()">조회</button>
        </div>
    </div>

    <div id="step-result" style="display:none;">
        <div id="result-title">조회 결과</div>

        <div id="no-result" style="display:none;">
            조회 결과가 없습니다.<br>생년월일을 다시 확인해주세요.
        </div>

        <table id="result-table" class="table table-hover table-bordered" style="display:none;">
            <thead class="table-dark text-center">
                <tr>
                    <th>이름</th>
                    <th>생년월일</th>
                    <th>교육과정</th>
                    <th>기숙사</th>
                    <th>전화번호</th>
                </tr>
            </thead>
            <tbody id="result-body" class="text-center"></tbody>
        </table>

        <div id="pagination-area" style="display:none;">
            <button id="prev-btn" class="page-btn" onclick="prevPage()">← 이전</button>
            <span id="page-info"></span>
            <button id="next-btn" class="page-btn" onclick="nextPage()">다음 →</button>
        </div>

        <div id="selected-area" style="display:none;">
            선택된 교육생 : <span id="selected-name"></span>
            &nbsp;|&nbsp;
            교육과정 : <span id="selected-edu"></span>
        </div>

        <div id="result-actions">
            <button type="button" id="back-btn" class="btn btn-secondary" onclick="goBackToKeypad()">
                ← 다시 입력
            </button>
            <button type="button" id="confirm-btn" class="btn btn-success" onclick="confirmStudent()" style="display:none;">
                ✅ 확인
            </button>
        </div>
    </div>