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