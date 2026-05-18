var inputValue = '';

function searchByBirth(birth) {

    showLoading();

	$.ajax({
		url: '/searchStudent.do',
		data: {param : birth},
		success: function(data) {
            hideLoading();
			$('#result-body').empty();
            $('#selected-area').hide();
            $('#confirm-btn').hide();
            $('#cancel-btn').hide();

            inputValue = '';
            $('#keypad-display').text('');

			if(data.length == 0) {
				$('#result-table').hide()
				$('#no-result').show();
				return;
			}
			
			$('#result-table').show()
			$('#no-result').hide();
			
			$.each(data, function(i, row) {
                var tr = '<tr class="student-row" data-student=\'' + JSON.stringify(row) + '\'>' +
                            '<td>' + escapeHtml(row.STUDENT_ID) + '</td>' +
                            '<td>' + escapeHtml(row.STUDENT_NAME) + '</td>' +
                            '<td>' + escapeHtml(row.BIRTH_DATE) + '</td>' +
                            '<td>' + escapeHtml(row.EDU_NAME) + '</td>' +
                            '<td>' + escapeHtml(row.DORMITORY_ID) + '</td>' +
                         '</tr>';
                $('#result-body').append(tr);
			});
		},
		error: function() {
            hideLoading();
			showAlert("오류 발생");
		}
	});
}

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

function confirmStudent() {
    // console.log('SELECTED :: ' + selected.STUDENT_NAME);
    // alert(selected.STUDENT_ID + "선택됨")

    var selected = $('.student-row.table-primary').data('student');
    var studentId = selected.STUDENT_ID;

    showLoading();

    $.ajax({
        url: '/updateStudent.do',
        type: 'POST',
        data: {param: studentId},
        dataType: 'json',
        success: function(data) {
            if(data.status == 'success') {
                    console.log(data);        
                    console.log(data.status);
                $.ajax({
                    url: '/studentDetail.do',
                    data: { param: studentId },
                    success: function(data) {
                        hideLoading();
                        $('#content-area').load('/guide.do', function() {
                            $('#card-name').text(data.STUDENT_NAME);
                            $('#card-edu-name').text(data.EDU_NAME);
                            $('#card-room').text(data.EDU_ROOM_NAME + '호');
                            $('#card-floor').text(data.EDU_ROOM_NAME.charAt(0) + '층');
                            $('#card-period').text(data.START_DATE + ' ~ ' + data.END_DATE);
                            
                            var dormId = data.DORMITORY_ID;
                            if(dormId == null || dormId == 'X') {
                                $('#card-dorm').text('생활관 미배정');
                            } else {
                                var dong = dormId.charAt(5);
                                var ho = dormId.substr(6);
                                $('#card-dorm').text(dong + '동 ' + ho + '호');
                            }
                        });
                    }
                });
            }
            else if(data.status == 'already') {
                hideLoading();
                showConfirm('이미 출석 처리된 교육생입니다. \n안내 화면으로 이동하시겠습니까?', function() {
                    $.ajax({
                        url: '/studentDetail.do',
                        data: {param: studentId},
                        success: function(data) {
                            $('#content-area').load('/guide.do', function() {
                                $('#card-name').text(data.STUDENT_NAME);
                                $('#card-edu-name').text(data.EDU_NAME);
                                $('#card-room').text(data.EDU_ROOM_NAME + '호');
                                $('#card-floor').text(data.EDU_ROOM_NAME.charAt(0) + '층');
                                $('#card-period').text(data.START_DATE + ' ~ ' + data.END_DATE);

                                var dormId = data.DORMITORY_ID;
                                if(dormId == null || dormId == 'X') {
                                    $('#card-dorm').text('생활관 미배정');
                                } else {
                                    var dong = dormId.charAt(5);
                                    var ho = dormId.substr(6);
                                    $('#card-dorm').text(dong + '동 ' + ho + '호');
                                }
                            });
                        }
                    });
                
                }, function() {
                    goHome();
                });
            }
            else {
                hideLoading();
                showAlert(data.message);
            }
        },
        error: function() {
            hideLoading();
            showAlert('오류가 발생하였습니다.');
        }
    });
}

function cancelSelect() {
    $('.student-row').removeClass('table-primary');
    $('#selected-area').hide();
    $('#confirm-btn').hide();
    $('#cancel-btn').hide();
}

// #####################################
// ########## 키패드 인터페이스 ###########
// #####################################


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

    var numRegex = /^[0-9]+$/;
    if(!numRegex.test(inputValue)) {
        showAlert('숫자만 입력 가능합니다.');
        return;
    }

    var month = parseInt(inputValue.substring(2, 4));
    var day = parseInt(inputValue.substring(4,6));

    if(month < 1 || month > 12) {
        showAlert('올바른 생년월일을 입력해주세요.');
        return;
    }
    if(day < 1 || day > 31) {
        showAlert('올바른 생년월일을 입력해주세요.');
        return;
    }

    searchByBirth(inputValue);
}
