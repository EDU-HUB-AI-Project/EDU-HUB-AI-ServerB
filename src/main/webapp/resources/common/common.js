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
    }, 500);
}

function loadPage(url) {
    $('#nav-badge, #nav-facility').removeClass('active');
    if(url == '/badge.do') {
        $('#nav-badge').addClass('active');
    } else if(url == '/facility.do') {
        $('#nav-facility').addClass('active');
    }
    $('#content-area').load(url);
}

function goHome() {
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