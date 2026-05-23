var smokingMap;

function initSmokingMap() {
    setTimeout(function() {
        kakao.maps.load(function() {
            var container = document.getElementById('smoking-map');
            var centerCoords = new kakao.maps.LatLng(35.564887329486496, 129.32046843019748);

            var options = {
                center : centerCoords,
                level : 2
            };

            // 지도 인스턴스 생성
            smokingMap = new kakao.maps.Map(container, options);

            // 흡연장 데이터 정의
            var smokingArea = {
                lat : 35.564887329486496,
                lng : 129.32046843019748,
                title : '흡연장',
                photos : [
                    '/images/smoking_area/smoking_area_1.png',
                    '/images/smoking_area/smoking_area_2.png'
                ]
            };

            // 마커 표시
            var markerPosition = new kakao.maps.LatLng(smokingArea.lat, smokingArea.lng);
            var marker = new kakao.maps.Marker({
                position : markerPosition,
                title : smokingArea.title
            });
            marker.setMap(smokingMap);

            // 하단 사진 영역 데이터 바인딩
            var photoTitleEl = document.getElementById('photo-title');
            var photo1El = document.getElementById('smoking-photo-1');
            var photo2El = document.getElementById('smoking-photo-2');

            if(photoTitleEl) photoTitleEl.innerText = smokingArea.title;
            if (photo1El) photo1El.src = smokingArea.photos[0];
            if (photo2El) photo2El.src = smokingArea.photos[1];

            // [재렌더링 방지] 동작 팝업/페이지 전환 시 깨짐 방지 레이아웃 재계산
            if(smokingMap) {
                smokingMap.relayout();
                smokingMap.setCenter(centerCoords);
            }
        });
    }, 100);
}