/* =====================
   전역 변수
   ===================== */
var inputValue      = '';
var selectedStudent = null;
var MAX_LENGTH      = 6;        // 생년월일 YYMMDD 6자리

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

    updateDisplay();
    updateProgress();
    updateSubmitButton();
}

// 최초 페이지 진입 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initKeypad();
});


/* =====================
   키패드 - 입력
   ===================== */
function pressKey(num) {
    if (inputValue.length < MAX_LENGTH) {
        inputValue += num;
        updateDisplay();
        updateProgress();
        updateSubmitButton();
    }
}

function deleteKey() {
    if (inputValue.length > 0) {
        inputValue = inputValue.slice(0, -1);
        updateDisplay();
        updateProgress();
        updateSubmitButton();
    }
}

function clearKey() {
    inputValue = '';
    updateDisplay();
    updateProgress();
    updateSubmitButton();
}


/* =====================
   키패드 - 디스플레이
   ===================== */
function updateDisplay() {
    var displayArea = document.getElementById('input-display');
    if (!displayArea) return;
    displayArea.innerHTML = '';

    var layout = [0, 1, 'space', 2, 3, 'space', 4, 5];
    
    layout.forEach(function(pos) {
        if(pos === 'space') {
            var space = document.createElement('div');
            space.className = 'input-space';
            displayArea.appendChild(space);
        }
        else if(pos < inputValue.length) {
            var digit = document.createElement('div');
            digit.className = 'input-digit';
            digit.textContent = inputValue[pos];
            
            if(pos === inputValue.length - 1) {
                digit.style.animation = 'digitSlideIn 0.2s ease-out';
            }
            else {
                digit.style.animation = 'none';
            }
            displayArea.appendChild(digit);
        }
        else {
            var placeholder = document.createElement('div');
            placeholder.className = 'input-placeholder';
            displayArea.appendChild(placeholder);
        }
    });
}

function updateProgress() {
    var fill = document.getElementById('progress-fill');
    var text = document.getElementById('progress-text');
    if (!fill || !text) return;
    fill.style.width = (inputValue.length / MAX_LENGTH * 100) + '%';
    text.textContent = inputValue.length + ' / ' + MAX_LENGTH;
}

function updateSubmitButton() {
    var btn = document.getElementById('submit-btn');
    if (!btn) return;
    btn.disabled = inputValue.length !== MAX_LENGTH;
}


/* =====================
   키패드 - 확인
   ===================== */
function confirmKey() {
    if (inputValue.length !== MAX_LENGTH) {
        showAlert('생년월일 6자리를 입력해주세요.');
        return;
    }

    var month = parseInt(inputValue.substring(2, 4));
    var day   = parseInt(inputValue.substring(4, 6));

    if (isNaN(month) || month < 1 || month > 12) {
        showAlert('올바른 생년월일을 입력해주세요.');
        return;
    }
    if (isNaN(day) || day < 1 || day > 31) {
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
                $('#result-section').hide();
                $('#no-result').show();
                $('#result-guide').hide();
                return;
            }

            $('#result-section').show();
            $('#result-table').show();
            $('#no-result').hide();
            $('#result-guide').show();

            allStudents = data;
            currentPage = 1;
            renderPage(1);
        },
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }
    });
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
    $('#content-area').load('/guide.do', function() {
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
    $('#content-area').load('/badge.do', function() {
        initKeypad();
    });
}