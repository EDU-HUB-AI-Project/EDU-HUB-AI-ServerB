var _modalOnHide = null;

function showModal(message, buttons, onHide, extraClass) {
    $('#common-modal-box').removeClass('modal-reprint');
    if (extraClass) $('#common-modal-box').addClass(extraClass);

    $('#modal-body').html(message.replace(/\n/g, '<br>'));
    $('#modal-footer').empty();
    _modalOnHide = onHide || null;

    buttons.forEach(function(btn) {
        $('<button type="button" class="modal-btn">')
        .addClass(btn.style)
        .text(btn.label)
        .on('click', function() {
            hideModal();
            if (typeof btn.callback === 'function') {
                btn.callback();
            }
        })
        .appendTo('#modal-footer');
    });

    $('#common-modal').css({
        display: 'flex',
        opacity: 0
    }).animate({opacity: 1}, 150);
}

function hideModal() {
    $('#common-modal').animate({ opacity: 0 }, 150, function() {
        $(this).css('display', 'none');
        if(typeof _modalOnHide === 'function') {
            _modalOnHide();
            _modalOnHide = null;
        }
    });
}

function showAlert(message, callback) {
    showModal(message, [
        {label: '확인', style: 'modal-btn-primary', callback: callback}
    ]);
}

function showConfirm(message, confirmCb, cancelCb, onHide) {
    showModal(message, [
        {label: '확인', style: 'modal-btn-primary', callback: confirmCb },
        {label: '취소', style: 'modal-btn-secondary', callback: cancelCb}
    ], onHide);
}

function showReprint(message, reprintCb, guideCb, homeCb) {
    showModal(message, [
        { label: '🖨️ 재출력', style: 'modal-btn-primary', callback: reprintCb },
        { label: '📋 안내 화면', style: 'modal-btn-secondary', callback: guideCb},
        { label: '🏠 처음으로', style: 'modal-btn-outline', callback: homeCb}
    ], null, 'modal-reprint');
}
