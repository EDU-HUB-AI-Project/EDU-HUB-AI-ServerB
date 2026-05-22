var inputValue = '';

/*  ------------------
    Guide.jsp 이동 함수
    ----------------*/
function moveToGuide(data) {
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

            $('#result-body').empty();
            $('#selected-area').hide();
            $('#confirm-btn').hide();
            $('#cancel-btn').hide();

            inputValue = '';
            $('#keypad-display').text('');

            if(data.length === 0) {
                $('#result-table').hide();
                $('#no-result').show();
                return;
            }

            $('#result-table').show();
            $('#no-result').hide();

            $.each(data, function(i, row) {
                var $tr = $('<tr>').addClass('student-row').data('student', row);

                ['STUDENT_ID', 'STUDENT_NAME', 'BIRTH_DATE', 'EDU_NAME', 'DORMITORY_ID'].forEach(function(key) {
                    $('<td>').text(row[key] || '').appendTo($tr);
                });

                $('#result-body').append($tr);
            });
        },
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }
    });
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
    $('#cancel-btn').show();
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
                fetchDetailAndReprint(studentId);
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
    $('#cancel-btn').hide();
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
function fetchDetailAndReprint(studentId) {
    showLoading();
    $.ajax({
        url: '/badge/print.do',
        data: {param: studentId},
        success: function(data) {
            hideLoading();
            if(data.status === 'success') {
                moveToGuide(data.data);
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
    if(inputValue.length >= 6) return;
    inputValue += num;
    $('#keypad-display').text(inputValue);
}

function deleteKey() {
    inputValue = inputValue.slice(0, -1);
    $('#keypad-display').text(inputValue);
}

function clearKey() {
    inputValue = '';
    $('#keypad-display').text('');
}

function confirmKey() {
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