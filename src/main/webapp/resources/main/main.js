document.addEventListener('DOMContentLoaded', function() {
    var introContainer = document.getElementById('intro-container');
    var mainButtons = document.querySelectorAll('#intro-container .btn-wrap-main > button');
    var quickButtons = document.querySelectorAll('#intro-container .btn-quick');
    var staggerItems = Array.prototype.slice.call(mainButtons).concat(Array.prototype.slice.call(quickButtons));
    var titleRows = document.querySelectorAll('#intro-container .intro-title-row');
    var titleCycleTimer = null;
    var messageIndex = 0;

    var INTRO_MESSAGES = [
        ['원하는', '<span class="intro-title-highlight">서비스</span>를', '선택해주세요'],
        ['여기서', '<span class="intro-title-highlight">명찰</span>을', '발급받으세요'],
        ['시설·교통', '<span class="intro-title-highlight">정보</span>도', '확인하세요']
    ];

    var ROW_INTERVAL = 520;
    var MESSAGE_PAUSE = 3200;

    staggerItems.forEach(function(el, i) {
        setTimeout(function() {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 120 + i * 100);
    });

    var entranceDone = 120 + staggerItems.length * 100 + 500;
    setTimeout(function() {
        if (introContainer) {
            introContainer.classList.add('intro-animated');
        }
    }, entranceDone);

    function clearTitleCycle() {
        if (titleCycleTimer) {
            clearTimeout(titleCycleTimer);
            titleCycleTimer = null;
        }
    }

    function setRowContent(rowIdx, html, animate) {
        var row = titleRows[rowIdx];
        if (!row) return;

        var current = row.querySelector('.intro-title-text--visible');
        if (!current || !animate) {
            row.innerHTML = '<span class="intro-title-text intro-title-text--visible">' + html + '</span>';
            return;
        }

        current.classList.remove('intro-title-text--visible');
        current.classList.add('intro-title-text--exit');

        var incoming = document.createElement('span');
        incoming.className = 'intro-title-text';
        incoming.innerHTML = html;
        row.appendChild(incoming);

        incoming.offsetHeight;
        incoming.classList.add('intro-title-text--visible');

        setTimeout(function() {
            if (current.parentNode === row) {
                current.remove();
            }
        }, 520);
    }

    function resetTitleMessage(index) {
        INTRO_MESSAGES[index].forEach(function(html, rowIdx) {
            setRowContent(rowIdx, html, false);
        });
        messageIndex = index;
    }

    function advanceTitleByRow() {
        var nextMessageIndex = (messageIndex + 1) % INTRO_MESSAGES.length;
        var rowIdx = 0;

        function changeNextRow() {
            if (rowIdx >= INTRO_MESSAGES[nextMessageIndex].length) {
                messageIndex = nextMessageIndex;
                titleCycleTimer = setTimeout(advanceTitleByRow, MESSAGE_PAUSE);
                return;
            }

            setRowContent(rowIdx, INTRO_MESSAGES[nextMessageIndex][rowIdx], true);
            rowIdx += 1;
            titleCycleTimer = setTimeout(changeNextRow, ROW_INTERVAL);
        }

        changeNextRow();
    }

    function startTitleRotation() {
        if (INTRO_MESSAGES.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        clearTitleCycle();
        titleCycleTimer = setTimeout(advanceTitleByRow, MESSAGE_PAUSE);
    }

    setTimeout(startTitleRotation, 2000);

    window.stopIntroAnimations = function() {
        clearTitleCycle();
        if (introContainer) {
            introContainer.classList.remove('intro-animated');
        }
    };

    window.restartIntroAnimations = function() {
        if (!introContainer) return;

        clearTitleCycle();
        resetTitleMessage(0);
        introContainer.classList.add('intro-animated');
        setTimeout(startTitleRotation, 2000);
    };

    function bindTouchScale(selector) {
        document.querySelectorAll(selector).forEach(function(el) {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            }, { passive: true });

            el.addEventListener('touchend', function() {
                this.style.removeProperty('transform');
            });

            el.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                var self = this;
                setTimeout(function() {
                    self.style.removeProperty('transform');
                }, 200);
            });
        });
    }

    bindTouchScale('#intro-container .btn-wrap-main > button');
    bindTouchScale('#intro-container .btn-quick');
});
