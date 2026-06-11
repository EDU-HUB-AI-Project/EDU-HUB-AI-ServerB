var toastRootId = 'toast-root';

var toastIcons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#309529" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast__icon" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d22d2d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast__icon" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>'
};

function ensureToastRoot() {
    var el = document.getElementById(toastRootId);
    if (!el) {
        el = document.createElement('div');
        el.id = toastRootId;
        el.className = 'toast-root';
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
        document.body.appendChild(el);
    }
    return el;
}

function showToast(message, type, ms) {
    var kind = type || 'success';
    var duration = ms === undefined ? 3000 : ms;
    var root = ensureToastRoot();
    var item = document.createElement('div');
    item.className = 'toast toast--' + kind;
    item.setAttribute('role', 'status');
    item.innerHTML = (kind === 'error' ? toastIcons.error : toastIcons.success) +
        '<span class="toast__text"></span>';
    item.querySelector('.toast__text').textContent = message;
    root.appendChild(item);
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            item.classList.add('toast--in');
        });
    });
    window.setTimeout(function() {
        item.classList.remove('toast--in');
        item.classList.add('toast--out');
        window.setTimeout(function() {
            if (item.parentNode) {
                item.parentNode.removeChild(item);
            }
        }, 280);
    }, duration);
}
