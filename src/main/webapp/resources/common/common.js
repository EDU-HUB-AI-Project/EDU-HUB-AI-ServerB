function selectMenu(url) {
    $('#intro-overlay').css('opacity', '0');

    setTimeout(function() {
        $('#intro-overlay').hide();

        $('#header').css('display', 'flex');
        $('#footer').css('display', 'flex');

        $('#nav-badge, #nav-facility').removeClass('active');
        if(url == '/badge.do') {
            $('#nav-badge').addClass('active');
        } else {
            $('#nav-facility').addClass('active');
        }

        loadPage(url);
        startIdleTimer();
    }, 500);
}
 
function loadPage(url) {
    $('#nav-badge, #nav-facility').removeClass('active');
    if(url == '/badge.do') {
        $('#nav-badge').addClass('active');
    } else if(url == '/facility.do') {
        $('#nav-facility').addClass('active');
    }
    $('#content-area').load(url, function(response, status) {
        if(status === 'error') showAlert('페이지 로드에 실패했습니다.');
    });
    resetIdleTimer();
}

function goHome() {
    clearIdleTimer();
    $('#content-area').empty();
    $('#header').hide();
    $('#footer').hide();
    $('#nav-badge, #nav-facility').removeClass('active');
    $('#intro-overlay').css('opacity', '1');
    $('#intro-overlay').show();
}

function showLoading() {
    $('#loading-overlay').css('display', 'flex');
}

function hideLoading() {
    $('#loading-overlay').hide();
}

function escapeHtml(str) {
    if(str == null) return '';
    return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

var modalCallback = null;

function showAlert(message, callback) {
    $('#modalBody').html(message.replace(/\n/g, '<br>'));
    $('#modalFooter').html(
        '<button type="button" class="btn btn-primary btn-lg" ' +
        'data-bs-dismiss="modal" onclick="modalClose()">확인</button>'
    );
    modalCallback = callback || null;
    $('#commonModal').modal('show');
}

function showConfirm(message, confirmCallback, cancelCallback) {
    $('#modalBody').html(message.replace(/\n/g, '<br>'));
    $('#modalFooter').html(
        '<button type="button" class="btn btn-primary btn-lg me-3" ' +
        'onclick="modalConfirm()">확인</button>' +
        '<button type="button" class="btn btn-secondary btn-lg" ' +
        'onclick="modalCancel()">취소</button>'
    );
    modalCallback = confirmCallback || null;
    window.modalCancelCallback = cancelCallback || null;
    $('#commonModal').modal('show');
}

function modalConfirm() {
    $('#commonModal').modal('hide');
    if(typeof modalCallback === 'function') modalCallback();
}

function modalCancel() {
    $('#commonModal').modal('hide');
    if(typeof window.modalCancelCallback === 'function') window.modalCancelCallback();
}

function modalClose() {
    $('#commonModal').modal('hide');
    if(typeof modalCallback === 'function') modalCallback();
}

// 자동 초기화 타이머
var idleTimer = null;
var idleTime = 10000;   // 테스트용 10초

function startIdleTimer() {
    clearIdleTimer();
    idleTimer = setTimeout(function() {
        var countdown = 10;

        showConfirm(
            '일정 시간 동안 조작이 없습니다.<br>처음 화면으로 이동하시겠습니까?<br><br>' +
            '<span id="countdown-timer" style="font-size:2rem; font-weight:bold; color:#0055A4;">' +
            countdown + '초</span>',
            function() {
                goHome();
            },
            function() {
                startIdleTimer();
            }
        );

        var countdownInterval = setInterval(function() {
            countdown--;
            $('#countdown-timer').text(countdown + '초');

            if(countdown <= 0) {
                clearInterval(countdownInterval);
                $('#commonModal').modal('hide');
                goHome();
            }
        }, 1000)

        $('#commonModal').one('hidden.bs.modal', function() {
            clearInterval(countdownInterval);
        });

    }, idleTime)
}

function clearIdleTimer() {
    if(idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
    }
}

function resetIdleTimer() {
    startIdleTimer();
}

$(document).ready(function() {
    // 터치/클릭/키보드 동작 감지
    $(document).on('click touchstart keypress', function() {
        resetIdleTimer();
    });
});