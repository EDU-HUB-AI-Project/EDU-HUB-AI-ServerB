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

var FAQ_WELCOME_MESSAGE = '안녕하세요! EDU HUB AI 안내 도우미입니다.\n궁금한 내용을 아래에서 선택해 주세요.';

var faqAnswerTimer = null;
var faqUsedIndexes = {};

function isFaqPanelOpen() {
    return $('#faq-modal-overlay').hasClass('open');
}

function scrollFaqChatToBottom() {
    var el = document.getElementById('faq-chat-messages');
    if (!el) return;
    el.scrollTop = el.scrollHeight;
}

function appendFaqChatMessage(role, text) {
    var $messages = $('#faq-chat-messages');
    var safeText = escapeHtml(text).replace(/\n/g, '<br>');

    if (role === 'bot') {
        $messages.append(
            '<div class="faq-chat-row faq-chat-row--bot">' +
                '<span class="faq-chat-avatar faq-chat-avatar--sm" aria-hidden="true">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' +
                    '</svg>' +
                '</span>' +
                '<div class="faq-chat-bubble faq-chat-bubble--bot"><p>' + safeText + '</p></div>' +
            '</div>'
        );
    } else {
        $messages.append(
            '<div class="faq-chat-row faq-chat-row--user">' +
                '<div class="faq-chat-bubble faq-chat-bubble--user"><p>' + safeText + '</p></div>' +
            '</div>'
        );
    }

    scrollFaqChatToBottom();
}

function showFaqChatTyping() {
    if ($('#faq-chat-typing').length) return;

    $('#faq-chat-messages').append(
        '<div id="faq-chat-typing" class="faq-chat-row faq-chat-row--bot">' +
            '<span class="faq-chat-avatar faq-chat-avatar--sm" aria-hidden="true">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' +
                '</svg>' +
            '</span>' +
            '<div class="faq-chat-bubble faq-chat-bubble--bot faq-chat-bubble--typing">' +
                '<span class="thinking-dot"></span>' +
                '<span class="thinking-dot"></span>' +
                '<span class="thinking-dot"></span>' +
            '</div>' +
        '</div>'
    );
    scrollFaqChatToBottom();
}

function hideFaqChatTyping() {
    $('#faq-chat-typing').remove();
}

function renderFaqChatChips() {
    var html = '';

    KIOSK_FAQ_ITEMS.forEach(function(item, index) {
        if (faqUsedIndexes[index]) return;
        html += '<button type="button" class="faq-chat-chip" data-faq-index="' + index + '">' +
            escapeHtml(item.q) +
        '</button>';
    });

    var $chips = $('#faq-chat-chips');
    $chips.html(html);
    $chips.toggle(html.length > 0);
}

function resetFaqChat() {
    clearTimeout(faqAnswerTimer);
    faqUsedIndexes = {};
    $('#faq-chat-messages').empty();
    $('#faq-chat-chips').empty();
}

function initFaqChat() {
    resetFaqChat();
    appendFaqChatMessage('bot', FAQ_WELCOME_MESSAGE);
    renderFaqChatChips();
}

function askFaqQuestion(index) {
    var item = KIOSK_FAQ_ITEMS[index];
    if (!item || faqUsedIndexes[index]) return;

    resetIdleTimer();
    faqUsedIndexes[index] = true;

    appendFaqChatMessage('user', item.q);
    renderFaqChatChips();
    showFaqChatTyping();

    clearTimeout(faqAnswerTimer);
    faqAnswerTimer = setTimeout(function() {
        hideFaqChatTyping();
        appendFaqChatMessage('bot', item.a);
    }, 650);
}

function openFaqPanel() {
    if (isFaqPanelOpen()) return;

    resetIdleTimer();
    initFaqChat();

    $('#faq-modal-overlay').addClass('open');
    $('#faq-fab').addClass('is-open').attr('aria-expanded', 'true');
}

function closeFaqPanel() {
    clearTimeout(faqAnswerTimer);

    $('#faq-modal-overlay').removeClass('open');
    $('#faq-fab').removeClass('is-open').attr('aria-expanded', 'false');
    resetFaqChat();
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
    $(document).on('click', '.faq-chat-chip', function() {
        var index = parseInt($(this).attr('data-faq-index'), 10);
        if (!isNaN(index)) {
            askFaqQuestion(index);
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
