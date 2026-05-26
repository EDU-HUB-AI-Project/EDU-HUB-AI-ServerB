var smokingMap;

function initSmokingMap() {
    setTimeout(function() {
        kakao.maps.load(function() {
            var container = document.getElementById('smoking-map');
            var centerCoords = new kakao.maps.LatLng(35.565283, 129.320682);

            var options = {
                center : centerCoords,
                level : 2
            };

            smokingMap = new kakao.maps.Map(container, options);

            var smokingArea = {
                lat : 35.565283,
                lng : 129.320682,
                title : '흡연장',
                photos : [
                    '/images/smoking_area/smoking_area_1.png',
                    '/images/smoking_area/smoking_area_2.png'
                ]
            };

            var markerPosition = new kakao.maps.LatLng(smokingArea.lat, smokingArea.lng);
            var marker = new kakao.maps.Marker({
                position : markerPosition,
                title : smokingArea.title
            });
            marker.setMap(smokingMap);

            var photoTitleEl = document.getElementById('photo-title');
            var photo1El = document.getElementById('smoking-photo-1');
            var photo2El = document.getElementById('smoking-photo-2');

            if(photoTitleEl) photoTitleEl.innerText = smokingArea.title;
            if(photo1El) photo1El.src = smokingArea.photos[0];
            if(photo2El) photo2El.src = smokingArea.photos[1];

            if(smokingMap) {
                smokingMap.relayout();
                smokingMap.setCenter(centerCoords);
            }

            // ★ 디자인 추가: 지도 로드 후 애니메이션 실행
            runAnimations();
        });
    }, 100);
}

// ★ 디자인 추가: 애니메이션
function runAnimations() {
    // 지도 영역
    var mapSection = document.querySelector('.map-section');
    if (mapSection) {
        setTimeout(function() {
            mapSection.style.opacity = '1';
            mapSection.style.transform = 'translateY(0)';
        }, 100);
    }

    // 정보 카드
    var infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(function(card, index) {
        setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });

    // 갤러리
    var galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(function(item, index) {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, 600 + (index * 150));
    });

    // 안내사항
    var noticeItems = document.querySelectorAll('.notice-item');
    noticeItems.forEach(function(item, index) {
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 900 + (index * 80));
    });
}