(function() {
    var items = document.querySelectorAll('#facility-container .btn-wrap--animate > button');
    items.forEach(function(item, i) {
        setTimeout(function() {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 50 + i * 100);
    });

    items.forEach(function(item) {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        item.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
    });
})();
