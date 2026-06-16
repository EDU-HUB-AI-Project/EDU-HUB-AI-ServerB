/* =====================
   전역 변수
   ===================== */
var inputValue      = '';
var selectedStudent = null;
var MAX_LENGTH      = 6;

var allStudents     = [];
var currentPage     = 1;
var MAX_PER_PAGE    = 5;


/* =====================
   키패드 초기화
   ===================== */
function initKeypad() {
    inputValue      = '';
    selectedStudent = null;
    allStudents     = [];
    currentPage     = 1;

    bindKeypadEvents();
    updateBirthUI();
}

function bindKeypadEvents() {
    var keypad = document.getElementById('step-keypad');
    if (!keypad || keypad.dataset.bound === 'true') return;
    keypad.dataset.bound = 'true';

    keypad.querySelectorAll('.inputNum').forEach(function(btn) {
        btn.addEventListener('click', function() {
            pressKey(btn.getAttribute('data-num'));
        });
    });

    var backspaceBtn = document.getElementById('backspaceBtn');
    if (backspaceBtn) {
        backspaceBtn.addEventListener('click', deleteKey);
    }

    var resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', clearKey);
    }

    var submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', confirmKey);
    }
}

function pressKey(num) {
    if (!canAppendBirth(inputValue, num)) return;
    if (inputValue.length >= MAX_LENGTH) return;
    inputValue += num;
    updateBirthUI();
}

function deleteKey() {
    if (!inputValue.length) return;
    inputValue = inputValue.slice(0, -1);
    updateBirthUI();
}

function clearKey() {
    inputValue = '';
    updateBirthUI();
}

function updateBirthUI() {
    var birthDisplay = document.getElementById('birthDisplay');
    var digitCells = document.querySelectorAll('#birthDisplay .digit');
    var validMsg = document.getElementById('validMsg');
    var backspaceBtn = document.getElementById('backspaceBtn');
    var resetBtn = document.getElementById('resetBtn');
    var submitBtn = document.getElementById('submit-btn');
    var inputNums = document.querySelectorAll('#btn-main .inputNum');
    var cursorIdx = inputValue.length < MAX_LENGTH ? inputValue.length : -1;

    digitCells.forEach(function(cell) {
        var i = +cell.dataset.idx;
        var ch = inputValue[i];
        var len = inputValue.length;

        cell.classList.remove('empty', 'masked', 'cursor', 'filled');

        if (!ch) {
            cell.textContent = '';
            cell.classList.add('empty');
        } else if (len > 1 && i < len - 1) {
            cell.textContent = '•';
            cell.classList.add('masked', 'filled');
        } else {
            cell.textContent = ch;
            cell.classList.add('filled');
        }

        if (i === cursorIdx) {
            cell.classList.add('cursor');
        }
    });

    inputNums.forEach(function(btn) {
        var val = btn.getAttribute('data-num');
        btn.disabled = !canAppendBirth(inputValue, val);
    });

    if (backspaceBtn) backspaceBtn.disabled = inputValue.length === 0;
    if (resetBtn) resetBtn.disabled = inputValue.length === 0;
    if (submitBtn) submitBtn.disabled = !isValidBirth(inputValue);

    if (!birthDisplay) return;
    birthDisplay.classList.remove('success-border', 'fail-border');

    if (validMsg) {
        validMsg.textContent = '';
        validMsg.classList.remove('fail-msg');
    }

    if (isValidBirth(inputValue)) {
        birthDisplay.classList.add('success-border');
    } else if (inputValue.length === MAX_LENGTH) {
        birthDisplay.classList.add('fail-border');
        if (validMsg) {
            validMsg.textContent = '올바른 생년월일을 입력해주세요.';
            validMsg.classList.add('fail-msg');
        }
    }
}


/* =====================
   키패드 - 확인
   ===================== */
function confirmKey() {
    if (!isValidBirth(inputValue)) {
        showAlert('올바른 생년월일을 입력해주세요.');
        return;
    }
    searchByBirth(inputValue);
}


/* =====================
   학생 조회
   ===================== */
function searchByBirth(birth) {
    showLoading();
    $.ajax({
        url: '/searchStudent.do',
        data: { param: birth },
        success: function(data) {
            hideLoading();

            if (data.status === 'error' || data.status === 'fail') {
                showAlert(data.message || '오류가 발생하였습니다.');
                return;
            }

            $('#step-keypad').hide();
            $('#step-result').css('display', 'flex');

            if (data.length === 0) {
                showEmptyResult();
                return;
            }

            showStudentResult(data);
        },
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }
    });
}


function showEmptyResult() {
    $('#step-result').addClass('is-empty');
    $('#result-title').html('조회 <span>결과</span>');
    $('#result-guide-box').hide();
    $('#no-result').css('display', 'flex');
    $('#result-section').hide();
    $('#result-guide').hide();
    $('#pagination-area').hide();
    $('#selected-section').hide();
    $('#result-actions').hide();
}

function showStudentResult(data) {
    $('#step-result').removeClass('is-empty');
    $('#result-title').html('본인을 <span>선택</span>해주세요.');
    $('#result-guide-box').show();
    $('#no-result').hide();
    $('#result-section').show();
    $('#result-table').show();
    $('#result-guide').show();
    $('#result-actions').css('display', 'flex');
    $('#back-btn').show();

    allStudents = data;
    currentPage = 1;
    renderPage(1);
}

/* =====================
   조회 결과 - 페이지네이션
   ===================== */
function renderPage(page) {
    currentPage = page;
    var totalPages = Math.ceil(allStudents.length / MAX_PER_PAGE);
    var start      = (page - 1) * MAX_PER_PAGE;
    var pageData   = allStudents.slice(start, start + MAX_PER_PAGE);

    $('#result-body').empty();
    $('#selected-area').hide();
    $('#selected-section').hide();
    $('#confirm-btn').css('display', 'none');

    $.each(pageData, function(i, row) {
        var $tr = $('<tr>').addClass('student-row').data('student', row);

        ['STUDENT_NAME', 'BIRTH_DATE', 'EDU_NAME', 'DORMITORY_ID', 'PHONE_NUMBER'].forEach(function(key) {
            var value = row[key] || '';

            if(key === 'BIRTH_DATE' && value.length === 6) {
                value = value.substr(0, 2) + '.' + value.substr(2, 2) + '.' + value.substr(4, 2);
            }

            if(key === 'DORMITORY_ID') {
                value = (value === '' || value === 'X') ? '없음' : '있음';
            }

            if(key === 'PHONE_NUMBER' && row[key] && row[key].length === 11) {
                value = row[key].slice(-4);
            }

            $('<td>').text(value).appendTo($tr);
        });

        $('#result-body').append($tr);
    });

    $('#page-info').text(page + ' / ' + totalPages);
    $('#prev-btn').prop('disabled', page === 1);
    $('#next-btn').prop('disabled', page === totalPages);
    $('#pagination-area').css('display', totalPages > 1 ? 'flex' : 'none');
}

function prevPage() {
    if (currentPage > 1) renderPage(currentPage - 1);
}

function nextPage() {
    var totalPages = Math.ceil(allStudents.length / MAX_PER_PAGE);
    if (currentPage < totalPages) renderPage(currentPage + 1);
}


/* =====================
   교육생 행 선택
   ===================== */
$(document).on('click', '.student-row', function() {
    selectStudent($(this).data('student'), $(this));
});

function selectStudent(student, $rowElement) {
    if (!student) return;
    selectedStudent = student;

    $('.student-row').removeClass('table-primary selected');
    if ($rowElement instanceof jQuery) {
        $rowElement.addClass('table-primary selected');
    }

    $('#selected-name').text(student.STUDENT_NAME);
    $('#selected-edu').text(student.EDU_NAME);
    $('#selected-area').show();
    $('#selected-section').show();
    $('#confirm-btn').css('display', 'flex');
}


/* =====================
   확인 / 취소
   ===================== */
function confirmStudent() {
    if (!selectedStudent) return;
    var studentId = selectedStudent.STUDENT_ID;

    showLoading();
    $.ajax({
        url: '/updateStudent.do',
        type: 'POST',
        data: { param: studentId },
        dataType: 'json',
        success: function(data) {
            if (data.status === 'success') {
                fetchDetailAndReprint(studentId, data.autoAssigned === 'Y');
            } else if (data.status === 'already') {
                hideLoading();
                showReprint(
                    '이미 출석 처리된 교육생입니다.',
                    function() { fetchDetailAndReprint(studentId); },
                    function() { fetchDetailAndGuide(studentId); },
                    function() { goHome(); }
                );
            } else {
                hideLoading();
                showAlert(data.message || '오류가 발생하였습니다.');
            }
        },
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }
    });
}

function cancelSelect() {
    selectedStudent = null;
    $('.student-row').removeClass('table-primary');
    $('#selected-area').hide();
    $('#selected-section').hide();
    $('#confirm-btn').hide();
}


/* =====================
   API 조회 함수
   ===================== */
function fetchDetailAndGuide(studentId) {
    showLoading();
    $.ajax({
        url: '/studentDetail.do',
        data: { param: studentId },
        success: function(data) {
            hideLoading();
            moveToGuide(data);
        },
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }
    });
}

function fetchDetailAndReprint(studentId, autoAssigned) {
    showLoading();
    $.ajax({
        url: '/badge/print.do',
        data: { param: studentId },
        success: function(data) {
            hideLoading();
            if (data.status === 'success') {
                moveToGuide(data.data, autoAssigned);
            } else {
                showAlert(data.message);
            }
        },
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.', goBackToKeypad);
        }
    });
}


/* =====================
   가이드 화면 이동
   ===================== */
function moveToGuide(data, autoAssigned) {
    $('#content-area').addClass('content-area--guide').load('/guide.do', function() {
        $('#card-name').text(data.STUDENT_NAME);
        $('#card-edu-name').text(data.EDU_NAME);
        $('#card-period').text(formatYYMMDD(data.START_DATE) + ' ~ ' + formatYYMMDD(data.END_DATE));

        var dormId = data.DORMITORY_ID;
        if (dormId == null || dormId === 'X') {
            $('#card-dorm').text('생활관 미배정');
        } else {
            $('#card-dorm').text(data.DORMITORY_ROOM_NAME + '호');
        }

        if (autoAssigned) {
            showAlert('생활관이 자동 배정되었습니다.\n배정 호실을 확인해주세요.');
        }

        initDormCanvas(data.DORMITORY_ROOM_NAME);
        renderSubject(data.subject);

        resetIdleTimer();
    });
}

function formatYYMMDD(s) {
    if(!s || s.length != 6) return s || '';
    return s.substr(0, 2) + '.' + s.substr(2, 2) + '.' + s.substr(4, 2);
}


/* =====================
   키패드로 돌아가기
   ===================== */
function goBackToKeypad() {
    $('#content-area').removeClass('content-area--guide').load('/badge.do', function() {
        initKeypad();
    });
}
