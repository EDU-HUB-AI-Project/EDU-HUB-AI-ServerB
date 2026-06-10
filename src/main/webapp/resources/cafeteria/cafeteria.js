function initCafeteria() {
    loadCafeteriaData();
    animateGallery();
    animateInfoItems();
    animateNoticeItems();
    bindGalleryClick();
}

function loadCafeteriaData() {
    var today = new Date().toISOString().split('T')[0];
    fetch('/facility/cafeteria/list/' + today + '.do')
        .then(function(res) { return res.json(); })
        .then(function(data) { renderCafeteriaTable(data); })
        .catch(function(err) { console.error('식단 데이터 로드 실패', err); });
}

function renderCafeteriaTable(data) {
    var tbody = document.querySelector('.menu-table tbody');
    tbody.innerHTML = '';

    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">오늘의 식단 정보가 없습니다.</td></tr>';
        return;
    }

    data.forEach(function(item, index) {
        tbody.innerHTML += makeMealRow(item);
        setTimeout(function() {
            var rows = document.querySelectorAll('.menu-table tbody tr');
            if (rows[index]) rows[index].classList.add('visible');
        }, 600 + (index * 100));
    });
}

function makeMealRow(item) {
    var labelMap = {
        BREAKFAST: { label: '아침', time: '07:00 - 09:00' },
        LUNCH:     { label: '점심', time: '11:30 - 13:30' },
        DINNER:    { label: '저녁', time: '17:30 - 19:30' }
    };

    var meal = labelMap[item.mealType] || { label: '', time: '' };

    var menuList = '';
    try {
        menuList = JSON.parse(item.menu).join(', ');
    } catch(e) {
        menuList = item.menu;
    }

    return '<tr class="menu-row">' +
        '<td class="meal-type"><span class="type-badge">' + meal.label + '</span></td>' +
        '<td>' + meal.time + '</td>' +
        '<td>' + menuList + '</td>' +
        '</tr>';
}

function animateGallery() {
    document.querySelectorAll('.gallery-item').forEach(function(item, index) {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });
}

function animateInfoItems() {
    document.querySelectorAll('.info-item').forEach(function(item, index) {
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
}

function animateNoticeItems() {
    document.querySelectorAll('.notice-item').forEach(function(item, index) {
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 900 + (index * 80));
    });
}

function bindGalleryClick() {
    document.querySelectorAll('.gallery-img').forEach(function(img) {
        img.addEventListener('click', function() {
            console.log('Image clicked:', this.alt);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.menu-table')) {
        initCafeteria();
    }
});