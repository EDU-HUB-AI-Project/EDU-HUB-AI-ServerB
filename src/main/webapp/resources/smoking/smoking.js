function initSmokingMap() {
    kakao.maps.load(function() {
        var container = document.getElementById('smoking-map');
        var options = {
            center : new kakao.maps.LatLng(35.564887329486496, 129.32046843019748),
            level : 2
        };
        var map = new kakao.maps.Map(container, options);

        var smokingArea = {
            lat : 35.56529749843293,
            lng : 129.32073941419753,
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
        marker.setMap(map);

        document.getElementById('photo-title').innerText = smokingArea.title;
        document.getElementById('smoking-photo-1').src = smokingArea.photos[0];
        document.getElementById('smoking-photo-2').src = smokingArea.photos[1];
    });
}