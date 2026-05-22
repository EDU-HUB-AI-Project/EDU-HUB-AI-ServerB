<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/resources/badge/badge.css">

<div id="badge-container">

    <div id="badge-title">
        🪪 명찰 발급 및 개인 맞춤 안내
    </div>

    <!-- 키패드 -->
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
        <button class="key-btn key-confirm w-100 mt-3" onclick="confirmKey()">조회</button>
    </div>

    <table id="result-table" class="table table-hover table-bordered" style="display:none;">
        <thead class="table-dark text-center">
            <tr>
                <th>학생 ID</th>
                <th>이   름</th>
                <th>생년월일</th>
                <th>교육과정</th>
                <th>기숙사</th>
            </tr>
        </thead>
        <tbody id="result-body" class="text-center">
        </tbody>
    </table>

    <div id="no-result">
        조회 결과가 없습니다. 생년월일을 다시 확인해주세요.
    </div>

    <div id="selected-area">
        선택된 교육생 : <span id="selected-name" style="color:#003399; font-weight:bold;"></span>
        &nbsp;|&nbsp;
        교육과정 : <span id="selected-edu" style="color:#003399; font-weight:bold;"></span>
    </div>

    <button type="button" id="confirm-btn" class="btn btn-success" onclick="confirmStudent()">
        ✅ 확인
    </button>

    <button type="button" id="cancel-btn" class="btn btn-danger" onclick="cancelSelect()">
        ❌ 취소
    </button>

    <!-- 명찰 출력 영역(인쇄용) -->
    <div id="print-label">
        <div id="print-edu-name"></div>
        <div id="print-student-name"></div>
        <div id="print-logo-area">
            <img src="/images/logo.gif" alt="로고">
        </div>
    </div>

</div>