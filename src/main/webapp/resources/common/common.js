function selectMenu(url) {
    $('#intro-overlay').css('opacity', '0');

    setTimeout(function() {
        $('#intro-overlay').hide();

        // show() 대신 flex로 명시
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
    // content-area 초기화
    $('#content-area').empty();

    // header, footer 숨기기
    $('#header').hide();
    $('#footer').hide();

    // active 초기화
    $('#nav-badge, #nav-facility').removeClass('active');

    // intro-overlay 다시 표시
    $('#intro-overlay').css('opacity', '1');
    $('#intro-overlay').show();
}