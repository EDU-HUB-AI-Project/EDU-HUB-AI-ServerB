/**
 * Lucide icon SVG (inline, 오프라인 키오스크용)
 * 사용: <span data-lucide="home" data-size="20"></span>
 * 로드 후 renderLucideIcons() 호출 (main·AJAX 페이지 공통)
 */
var LucideIcons = (function() {
    var paths = {
        'graduation-cap': '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
        'id-card': '<path d="M16 10h2"/><path d="M16 14h2"/><path d="M6 10h2"/><path d="M6 14h2"/><path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>',
        'building-2': '<path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>',
        'home': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
        'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        'chevron-left': '<path d="m15 18-6-6 6-6"/>',
        'utensils': '<path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
        'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        'bus': '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
        'school': '<path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 5v13"/><path d="m4 6 8-3 8 3"/><path d="M6 8v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/>',
        'sparkles': '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
        'layout-grid': '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
        'user-round': '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
        'book-open': '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>'
    };

    function svg(name, size, extraClass) {
        var inner = paths[name];
        if (!inner) {
            return '';
        }
        var cls = 'lucide-icon' + (extraClass ? ' ' + extraClass : '');
        return '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
    }

    function renderLucideIcons(root) {
        var scope = root || document;
        scope.querySelectorAll('[data-lucide]:not([data-lucide-rendered])').forEach(function(el) {
            var name = el.getAttribute('data-lucide');
            var size = parseInt(el.getAttribute('data-size'), 10) || 24;
            var extraClass = el.getAttribute('data-class') || '';
            var html = svg(name, size, extraClass);
            if (!html) {
                return;
            }
            el.setAttribute('data-lucide-rendered', 'true');
            el.outerHTML = html;
        });
    }

    return {
        svg: svg,
        render: renderLucideIcons
    };
})();

function renderLucideIcons(root) {
    LucideIcons.render(root);
}
