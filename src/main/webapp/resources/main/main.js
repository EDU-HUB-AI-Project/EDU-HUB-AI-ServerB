document.addEventListener('DOMContentLoaded', function() {
    var mainButtons = document.querySelectorAll('#intro-container .btn-wrap-main > button');
    var quickButtons = document.querySelectorAll('#intro-container .btn-quick');
    var staggerItems = Array.prototype.slice.call(mainButtons).concat(Array.prototype.slice.call(quickButtons));

    staggerItems.forEach(function(el, i) {
        setTimeout(function() {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 120 + i * 100);
    });

    function bindTouchScale(selector) {
        document.querySelectorAll(selector).forEach(function(el) {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            }, { passive: true });

            el.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
            });

            el.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                var self = this;
                setTimeout(function() {
                    self.style.transform = 'translateY(0)';
                }, 200);
            });
        });
    }

    bindTouchScale('#intro-container .btn-wrap-main > button');
    bindTouchScale('#intro-container .btn-quick');
});
