function initCafeteria() {
    loadCafeteriaData();
    animateGallery();
    animateInfoItems();
    animateNoticeItems();
}

function loadCafeteriaData() {
    var today = new Date().toISOString().split('T')[0];
    fetch('/facility/cafeteria/list/' + today + '.do')
        .then(function(res) { return res.json(); })
        .then(function(data) { renderCafeteriaTable(data); })
        .catch(function(err) { console.error('식단 데이터 로드 실패', err); });
}

function renderCafeteriaTable(data) {
    var tbody = document.querySelector('#cafeteria-container .menu-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="3">오늘의 식단 정보가 없습니다.</td></tr>';
        return;
    }

    data.forEach(function(item, index) {
        tbody.insertAdjacentHTML('beforeend', makeMealRow(item));
        setTimeout(function() {
            var rows = tbody.querySelectorAll('tr.menu-row');
            if (rows[index]) rows[index].classList.add('visible');
        }, 400 + (index * 100));
    });
}

function makeMealRow(item) {
    var labelMap = {
        BREAKFAST: { label: '아침', time: '07:00 - 09:00' },
        LUNCH:     { label: '점심', time: '11:30 - 13:30' },
        DINNER:    { label: '저녁', time: '17:30 - 19:30' }
    };

    var meal = labelMap[item.mealType] || { label: item.mealType || '-', time: '-' };

    var menuList = '';
    try {
        menuList = JSON.parse(item.menu).join(', ');
    } catch (e) {
        menuList = item.menu || '-';
    }

    return '<tr class="menu-row">' +
        '<td class="meal-type"><span class="type-badge">' + escapeHtml(meal.label) + '</span></td>' +
        '<td class="meal-time">' + escapeHtml(meal.time) + '</td>' +
        '<td class="meal-menu">' + escapeHtml(menuList) + '</td>' +
        '</tr>';
}

function escapeHtml(text) {
    if (text == null) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function animateGallery() {
    document.querySelectorAll('#cafeteria-container .cafeteria-photo-item').forEach(function(item, index) {
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 120);
    });
}

function animateInfoItems() {
    document.querySelectorAll('#cafeteria-container #cafeteria-info .info-card').forEach(function(item, index) {
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 240 + (index * 100));
    });
}

function animateNoticeItems() {
    document.querySelectorAll('#cafeteria-container .cafeteria-notice-item').forEach(function(item, index) {
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 700 + (index * 80));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#cafeteria-container .menu-table')) {
        initCafeteria();
    }
});
