// cafeteria.js

document.addEventListener('DOMContentLoaded', function() {

    // 갤러리 애니메이션
    var galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(function(item, index) {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });

    // 운영 정보 애니메이션
    var infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(function(item, index) {
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });

    // 테이블 행 애니메이션
    var tableRows = document.querySelectorAll('.menu-table tbody tr');
    tableRows.forEach(function(row, index) {
        setTimeout(function() {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 600 + (index * 100));
    });

    // 안내사항 애니메이션
    var noticeItems = document.querySelectorAll('.notice-item');
    noticeItems.forEach(function(item, index) {
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 900 + (index * 80));
    });

    // 갤러리 이미지 클릭
    var galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(function(img) {
        img.addEventListener('click', function() {
            console.log('Image clicked:', this.alt);
        });
    });

});