var allStudents = [];
var currentPage = 1;
var MAX_PER_PAGE = 5;

/*  ------------------
    Guide.jsp 이동 함수
    ----------------*/
function moveToGuide(data, autoAssigned) {
    $('#content-area').load('/guide.do', function() {
        $('#card-name').text(data.STUDENT_NAME);
        $('#card-edu-name').text(data.EDU_NAME);
        $('#card-room').text(data.EDU_ROOM_NAME + '호');
        $('#card-floor').text(data.EDU_ROOM_NAME.charAt(0) + '층');
        $('#card-period').text(data.START_DATE + ' ~ ' + data.END_DATE);

        var dormId = data.DORMITORY_ID;
        if(dormId == null || dormId == 'X') {
            $('#card-dorm').text('생활관 미배정');
        }
        else {
            var dong = dormId.charAt(5);
            var ho = dormId.substr(6);
            $('#card-dorm').text(dong + '동 ' + ho + '호');
        }

        if(autoAssigned) {
            showAlert('생활관이 자동 배정되었습니다.\n배정 호실을 확인해주세요.');
        }
        initGuideCanvas(data.EDU_ROOM_NAME);
    });
}

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

function updateDisplay() {
    var displayArea = document.getElementById('input-display');
    if (!displayArea) return;
    displayArea.innerHTML = '';

    if (inputValue.length > 0) {
        var formatted = formatDisplay(inputValue);
        formatted.split('').forEach(function(char, index) {
            if (char === ' ') {
                var space = document.createElement('div');
                space.className = 'input-space';
                displayArea.appendChild(space);
            } else {
                var digit = document.createElement('div');
                digit.className = 'input-digit';
                digit.textContent = char;
                digit.style.animationDelay = (index * 0.03) + 's';
                displayArea.appendChild(digit);
            }
        });

        var currentFormatLen = formatted.replace(/ /g, '').length;
        var remainingPlaceholders = MAX_LENGTH - currentFormatLen;
        
        var currentLen = inputValue.length;
        if (currentLen < 6) {
            if (currentLen === 2 || currentLen === 3) {
                var space = document.createElement('div');
                space.className = 'input-space';
                displayArea.appendChild(space);
            }
            if (currentLen === 4 || currentLen === 5) {
                if (currentLen === 4) {
                    var space = document.createElement('div');
                    space.className = 'input-space';
                    displayArea.appendChild(space);
                }
            }
            for (var i = 0; i < remainingPlaceholders; i++) {
                if (currentLen === 2 && i === 2) {
                    var space = document.createElement('div');
                    space.className = 'input-space';
                    displayArea.appendChild(space);
                }
                var placeholder = document.createElement('div');
                placeholder.className = 'input-placeholder';
                displayArea.appendChild(placeholder);
            }
        }
    } else {
        for (var i = 0; i < MAX_LENGTH; i++) {
            if (i === 2 || i === 4) {
                var space = document.createElement('div');
                space.className = 'input-space';
                displayArea.appendChild(space);
            }
            var placeholder = document.createElement('div');
            placeholder.className = 'input-placeholder';
            displayArea.appendChild(placeholder);
        }
    }
}

function formatDisplay(val) {
    if (val.length <= 2) return val;
    if (val.length <= 4) return val.slice(0, 2) + ' ' + val.slice(2);
    return val.slice(0, 2) + ' ' + val.slice(2, 4) + ' ' + val.slice(4);
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

function searchByBirth(birth) {
    showLoading();
    $.ajax({
        url: '/searchStudent.do',
        data: {param: birth},
        success: function(data) {
            hideLoading();
            if (data.status === 'error' || data.status === 'fail') {
                showAlert(data.message || '오류가 발생하였습니다.');
                return;
            }

            var stepKeypad = document.getElementById('step-keypad');
            var stepResult = document.getElementById('step-result');
            if (stepKeypad && stepResult) {
                $('#step-keypad').hide();
                $('#step-result').show();
            }

            if (data.length === 0) {
                document.getElementById('result-section').style.display = 'none';
                document.getElementById('no-result').style.display = 'block';
                return;
            }

            $('#result-section').show();
            $('#result-table').show();
            $('#no-result').hide();

            allStudents = data;
            currentPage = 1;
            renderPage(1);

            // $.each(data, function(i, row) {
            //     var $tr = $('<tr>').addClass('student-row').data('student', row);

            //     ['STUDENT_ID', 'STUDENT_NAME', 'BIRTH_DATE', 'EDU_NAME', 'DORMITORY_ID', 'PHONE_NUMBER'].forEach(function(key) {
            //         var value = row[key] || '';
            //         if(key === 'PHONE_NUMBER' && value.length === 11) {
            //             value = value.substring(0, 3) + '-****-' + value.slice(-4);
            //         }
            //         $('<td>').text(value).appendTo($tr);
            //     });

            //     $('#result-body').append($tr);
            // });
        },
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }
    });
}

/*  ---------------
    조회 결과(페이지)
    -------------*/
function renderPage(page) {
    currentPage = page;
    var totalPages = Math.ceil(allStudents.length / MAX_PER_PAGE);
    var start = (page - 1) * MAX_PER_PAGE;
    var pageData = allStudents.slice(start, start + MAX_PER_PAGE);

    $('#result-body').empty();
    $('#selected-area').hide();
    $('#selected-section').hide();
    $('#confirm-btn').hide();

    $.each(pageData, function(i, row) {
        var $tr = $('<tr>').addClass('student-row').data('student', row);

        ['STUDENT_NAME', 'BIRTH_DATE', 'EDU_NAME', 'DORMITORY_ID', 'PHONE_NUMBER'].forEach(function(key) {
            var value = row[key] || '';
            if(key === 'PHONE_NUMBER' && value.length === 11) {
                value = value.substring(0, 3) + '-****-' + value.slice(-4);
            }
            $('<td>').text(value).appendTo($tr);
        });

        $('#result-body').append($tr);
    });

    $('#page-info').text(page + ' / ' + totalPages);
    $('#prev-btn').prop('disabled', page === 1);
    $('#next-btn').prop('disabled', page === totalPages);
    $('#pagination-area').toggle(totalPages > 1);
}

/*  --------------------
    조회 결과 이전 페이지로
    ------------------*/
function prevPage() {
    if(currentPage > 1) renderPage(currentPage - 1);
}
/*  --------------------
    조회 결과 다음 페이지로
    ------------------*/
function nextPage() {
    var totalPages = Math.ceil(allStudents.length / MAX_PER_PAGE);
    if(currentPage < totalPages) renderPage(currentPage + 1);
}

/*  ------------
    교육생 행 선택
    ----------*/
$(document).on('click', '.student-row', function() {
    $('.student-row').removeClass('table-primary');
    $(this).addClass('table-primary');

    var selected = $(this).data('student');
    $('#selected-name').text(selected.STUDENT_NAME);
    $('#selected-edu').text(selected.EDU_NAME);
    $('#selected-area').show();
    $('#selected-section').show();
    $('#confirm-btn').show();
});

/*  ------------
    확인 - 출석 시
    -----------*/
function confirmStudent() {
    if (!selectedStudent) return;
    var studentId = selectedStudent.STUDENT_ID;

    showLoading();
    $.ajax({
        url: '/updateStudent.do',
        type: 'POST',
        data: {param: studentId},
        dataType: 'json',
        success: function(data) {
            if(data.status === 'success') {
                fetchDetailAndReprint(studentId, data.autoAssigned === 'Y');
            }
            else if(data.status === 'already') {
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
        error: function () {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }
    });
}

/*  --------
    취소 버튼
    -------*/
function cancelSelect() {
    $('.student-row').removeClass('table-primary');
    $('#selected-area').hide();
    $('#selected-section').hide();
    $('#confirm-btn').hide();
}

/*  ------------
    API 조회 함수
    ----------*/

// 학생 상세 조회
function fetchDetailAndGuide(studentId) {
    showLoading();
    $.ajax({
        url: '/studentDetail.do',
        data: {param: studentId},
        success: function(data) {
            hideLoading();
            moveToGuide(data);
        },
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }

// 학생 상제 조회 후 재출력, 가이드 이동
function fetchDetailAndReprint(studentId, autoAssigned) {
    showLoading();
    $.ajax({
        url: '/badge/print.do',
        data: {param: studentId},
        success: function(data) {
            hideLoading();
            if(data.status === 'success') {
                moveToGuide(data.data, autoAssigned);
            }
            else {
                showAlert(data.message);
            }
        },
        error: function() { hideLoading(); showAlert('오류가 발생하였습니다.'); }
    });
}

/*  ---------------
    키패드 인터페이스
    -------------*/
function pressKey(num) {
    var current = $('#keypad-display').text();
    if(current.length >= 6) return;
    $('#keypad-display').text(current + num);
}

function deleteKey() {
    var current = $('#keypad-display').text();
    $('#keypad-display').text(current.slice(0, -1));
}

function clearKey() {
    $('#keypad-display').text('');
}

function confirmKey() {
    var inputValue = $('#keypad-display').text();
    if(inputValue.length != 6) {
        showAlert('생년월일 6자리를 입력해주세요.');
        return;
    }

    var month = parseInt(inputValue.substring(2, 4));
    var day = parseInt(inputValue.substring(4, 6));

    if(isNaN(month) || month < 1 || month > 12) {
        showAlert('올바른 생년월일을 입력해주세요.');
        return;   
    }
    if(isNaN(day) || day < 1 || day > 31) {
        showAlert('올바른 생년월일을 입력해주세요.');
        return;
    }

    searchByBirth(inputValue);
}


/*  ----------------
    조회 결과 후 재입력
    --------------*/
function goBackToKeypad() {
    allStudents = [];
    currentPage = 1;
    $('#step-result').hide();
    $('#step-keypad').show();
    $('#result-body').empty();
    $('#selected-area').hide();
    $('#confirm-btn').hide();
    $('#pagination-area').hide();
}
