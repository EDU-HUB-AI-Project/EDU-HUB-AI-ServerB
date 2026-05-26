(function() {
    var cards = document.querySelectorAll('.facility-card');
    cards.forEach(function(card, i) {
        setTimeout(function() {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50 + i * 120);
    });

    cards.forEach(function(card) {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
    });
})();
