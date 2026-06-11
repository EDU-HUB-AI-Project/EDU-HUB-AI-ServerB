var KIOSK_FAQ_ITEMS = [
    {
        q: '키오스크는 어떻게 사용하나요?',
        a: '처음 화면에서 원하는 서비스를 선택하세요. 명찰 발급, 시설 정보, 강의실·식당·교통 안내를 터치 한 번으로 이용할 수 있습니다.'
    },
    {
        q: '명찰은 어떻게 발급받나요?',
        a: '명찰 발급 메뉴에서 생년월일 6자리를 입력한 뒤, 목록에서 본인을 선택하고 발급을 진행하세요.'
    },
    {
        q: '강의실·시설 위치는 어디서 보나요?',
        a: '처음 화면 하단의 빠른 메뉴에서 강의실 위치·시설 위치를 선택하거나, 시설 정보 메뉴에서 확인할 수 있습니다.'
    },
    {
        q: '문제가 생기면 어디로 문의하나요?',
        a: '키오스크 이용 중 문제가 있으면 1층 안내 데스크로 문의해 주세요. 교육원 직원이 도와드립니다.'
    }
];

var faqThinkingTimer = null;
var faqAnswerTimer = null;

function renderFaqAccordion() {
    var chevronSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
    var html = '';

    KIOSK_FAQ_ITEMS.forEach(function(item) {
        html += '<div class="faq-item">';
        html += '<button type="button" class="faq-item-q" aria-expanded="false">';
        html += '<span class="faq-q-label">Q.</span>';
        html += '<span class="faq-q-text">' + escapeHtml(item.q) + '</span>';
        html += '<span class="faq-chevron">' + chevronSvg + '</span>';
        html += '</button>';
        html += '<div class="faq-item-a">';
        html += '<div class="faq-a-thinking">';
        html += '<span class="thinking-dot"></span><span class="thinking-dot"></span><span class="thinking-dot"></span>';
        html += '</div>';
        html += '<div class="faq-a-content">';
        html += '<span class="faq-a-label">A.</span>';
        html += '<p>' + escapeHtml(item.a) + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });

    $('#faq-accordion-list').html(html);
}

function closeFaqItem($item) {
    if (!$item || !$item.length) return;
    clearTimeout(faqAnswerTimer);
    $item.removeClass('is-open');
    $item.find('.faq-item-q').attr('aria-expanded', 'false');
    $item.find('.faq-a-thinking').addClass('is-hidden');
    $item.find('.faq-a-content').removeClass('is-visible');
}

function openFaqItem($item) {
    var $thinking = $item.find('.faq-a-thinking');
    var $content = $item.find('.faq-a-content');

    $item.addClass('is-open');
    $item.find('.faq-item-q').attr('aria-expanded', 'true');
    $thinking.removeClass('is-hidden');
    $content.removeClass('is-visible');

    clearTimeout(faqAnswerTimer);
    faqAnswerTimer = setTimeout(function() {
        $thinking.addClass('is-hidden');
        $content.addClass('is-visible');
    }, 280);
}

function isFaqPanelOpen() {
    return $('#faq-modal-overlay').hasClass('open');
}

function openFaqPanel() {
    if (isFaqPanelOpen()) return;

    resetIdleTimer();
    renderFaqAccordion();

    var $overlay = $('#faq-modal-overlay');
    $overlay.removeClass('ready').addClass('open thinking');
    $('#faq-fab').addClass('is-open').attr('aria-expanded', 'true');

    clearTimeout(faqThinkingTimer);
    faqThinkingTimer = setTimeout(function() {
        $overlay.removeClass('thinking').addClass('ready');
    }, 900);
}

function closeFaqPanel() {
    clearTimeout(faqThinkingTimer);
    clearTimeout(faqAnswerTimer);

    var $overlay = $('#faq-modal-overlay');
    $overlay.removeClass('open thinking ready');
    $('#faq-fab').removeClass('is-open').attr('aria-expanded', 'false');
    $('#faq-accordion-list .faq-item').each(function() {
        closeFaqItem($(this));
    });
}

function toggleFaqPanel() {
    if (isFaqPanelOpen()) {
        closeFaqPanel();
    } else {
        openFaqPanel();
    }
}

function showFaqFab() {
    $('#faq-fab').css('display', 'inline-flex');
}

function hideFaqFab() {
    closeFaqPanel();
    $('#faq-fab').hide();
}

$(document).ready(function() {
    $(document).on('click', '.faq-item-q', function() {
        resetIdleTimer();
        var $item = $(this).closest('.faq-item');
        var isOpen = $item.hasClass('is-open');

        $('#faq-accordion-list .faq-item').not($item).each(function() {
            closeFaqItem($(this));
        });

        if (isOpen) {
            closeFaqItem($item);
        } else {
            openFaqItem($item);
        }
    });

    $('#faq-modal-close').on('click', function() {
        closeFaqPanel();
        resetIdleTimer();
    });

    $('#faq-modal-overlay').on('click', function(e) {
        if (e.target === this) {
            closeFaqPanel();
            resetIdleTimer();
        }
    });
});
