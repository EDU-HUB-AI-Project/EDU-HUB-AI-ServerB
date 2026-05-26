document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.menu-card');
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            var self = this;
            setTimeout(function() { self.style.transform = 'scale(1)'; }, 200);
        });
    });
});
