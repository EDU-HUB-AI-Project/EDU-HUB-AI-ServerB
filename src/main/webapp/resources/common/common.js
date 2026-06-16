function showFooterIntroMode() {
    $('body').addClass('intro-active').removeClass('app-active');
    $('#footer').css('display', 'block');
    if (typeof showFaqFab === 'function') {
        showFaqFab();
    }
}

function showFooterAppMode() {
    $('body').removeClass('intro-active').addClass('app-active');
    $('#footer').css('display', 'block');
    if (typeof showFaqFab === 'function') {
        showFaqFab();
    }
}

function enterAppFromIntro(url) {
    if (typeof window.stopIntroAnimations === 'function') {
        window.stopIntroAnimations();
    }
    $('#intro-container').css('opacity', '0');

    setTimeout(function() {
        $('#intro-container').hide();
        $('#header').css('display', 'flex');
        showFooterAppMode();

        $('#nav-badge, #nav-facility').removeClass('active');
        if (url === '/badge.do') {
            $('#nav-badge').addClass('active');
        } else {
            $('#nav-facility').addClass('active');
        }

        loadPage(url);
        startIdleTimer();
    }, 500);
}

function selectMenu(url) {
    enterAppFromIntro(url);
}

function selectShortcut(url) {
    enterAppFromIntro(url);
}

var currentPageUrl = null;
var footerBackUrl = null;

function updateFooterBack(url) {
    currentPageUrl = url;
    footerBackUrl = null;

    if (url && url.indexOf('/facility/') === 0 && url !== '/facility.do') {
        footerBackUrl = '/facility.do';
        $('#footer-back-btn').attr('aria-label', '시설 안내로');
    } else if (url === '/facility.do' || url === '/badge.do' || url === '/guide.do') {
        footerBackUrl = 'home';
        $('#footer-back-btn').attr('aria-label', '메인으로');
    }

    $('#footer-back-btn').toggle(!!footerBackUrl);
}

function handleFooterBack() {
    if (footerBackUrl === 'home') {
        goHome();
        return;
    }
    if (footerBackUrl) {
        loadPage(footerBackUrl);
    }
}

function updateHeaderTime() {
    var $time = $('#header-time, #intro-time');
    if (!$time.length) return;

    var now = new Date();
    var y = now.getFullYear();
    var mo = String(now.getMonth() + 1).padStart(2, '0');
    var d = String(now.getDate()).padStart(2, '0');
    var h = String(now.getHours()).padStart(2, '0');
    var mi = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    var text = y + '.' + mo + '.' + d + ' ' + h + ':' + mi + ':' + s;

    $time.text(text);
    $time.attr('datetime', now.toISOString());
}

function startHeaderClock() {
    updateHeaderTime();
    setInterval(updateHeaderTime, 1000);
}

function loadPage(url) {
    updateFooterBack(url);

    $('#nav-badge, #nav-facility').removeClass('active');
    if (url === '/badge.do') {
        $('#nav-badge').addClass('active');
    } else if (url === '/facility.do' || (url && url.indexOf('/facility/') === 0)) {
        $('#nav-facility').addClass('active');
    }
    $('#content-area').toggleClass('content-area--guide', url === '/guide.do');
    $('#content-area').load(url, function(response, status) {
        if(status === 'error') {
            if (typeof showToast === 'function') {
                showToast('페이지 로드에 실패했습니다.', 'error');
            } else {
                showAlert('페이지 로드에 실패했습니다.');
            }
        } else {
            // badge.do 로드 완료 후 키패드 초기화
            if(url === '/badge.do' && typeof initKeypad === 'function') {
                initKeypad();
            }
            if(url === '/facility/cafeteria.do' && typeof initCafeteria === 'function') {
                initCafeteria();
            }
            if(url === '/facility/transport.do' && typeof initTransportPage === 'function') {
                initTransportPage();
            }
        }
    });
    resetIdleTimer();
}

function goHome() {
    clearIdleTimer();
    hideModal();
    if (typeof closeFaqPanel === 'function') {
        closeFaqPanel();
    }
    $('#content-area').removeClass('content-area--guide').empty();
    $('#header').hide();
    $('#nav-badge, #nav-facility').removeClass('active');
    $('#intro-container').css('opacity', '1');
    $('#intro-container').show();
    showFooterIntroMode();
    if (typeof window.restartIntroAnimations === 'function') {
        window.restartIntroAnimations();
    }
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

// 자동 초기화 타이머
var idleTimer = null;
var idleTime = 120000;   // 2분

function startIdleTimer() {
    clearIdleTimer();
    idleTimer = setTimeout(function() {
        var countdown = 10;
        var countdownInterval = null;

        showConfirm(
            '일정 시간 동안 조작이 없습니다.<br>처음 화면으로 이동하시겠습니까?<br><br>' +
            '<span id="countdown-timer" style="font-size:2rem; font-weight:bold; color:#0055A4;">' +
            countdown + '초</span>',
            function() {
                clearInterval(countdownInterval);
                goHome();
            },
            function() {
                clearInterval(countdownInterval);
                startIdleTimer();
            }
        );

        var countdownInterval = setInterval(function() {
            countdown--;
            $('#countdown-timer').text(countdown + '초');

            if(countdown <= 0) {
                clearInterval(countdownInterval);
                hideModal();
                goHome();
            }
        }, 1000)
    }, idleTime)
}

function clearIdleTimer() {
    if(idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
    }
}

function resetIdleTimer() {
    if ($('body').hasClass('app-active')) {
        startIdleTimer();
    }
}

$(document).ready(function() {
    startHeaderClock();
    showFooterIntroMode();

    // 터치/클릭/키보드 동작 감지 (서브페이지 유휴 타이머)
    $(document).on('click touchstart keypress', function() {
        resetIdleTimer();
    });
});