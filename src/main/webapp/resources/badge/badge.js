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

/*  -----------
    생년월일 조회
    ---------*/
function searchByBirth(birth) {
    showLoading();
    $.ajax({
        url: '/searchStudent.do',
        data: {param: birth},
        success: function(data) {
            hideLoading();

            if(data.status === 'error' || data.status === 'fail') {
                showAlert(data.message || '오류가 발생하였습니다.');
                return;
            }

            $('#keypad-display').text('');
            $('#step-keypad').hide();
            $('#step-result').show();

            if(data.length === 0) {
                $('#result-table').hide();
                $('#no-result').show();
                return;
            }

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
    $('#confirm-btn').show();
});

/*  ------------
    확인 - 출석 시
    -----------*/
function confirmStudent() {
    var selected = $('.student-row.table-primary').data('student');
    var studentId = selected.STUDENT_ID;

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
                    function() {
                        fetchDetailAndReprint(studentId);
                    },
                    function() {
                        fetchDetailAndGuide(studentId);
                    },
                    function() {goHome();}
                );
            }
            else {
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
    });
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
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }
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