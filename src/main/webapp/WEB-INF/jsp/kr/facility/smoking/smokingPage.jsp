<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/smoking/smoking.css">

<div id="smoking-container">
    <div id="smoking-title">
        🚬 흡연장소 안내
    </div>

    <div id="smoking-content">

        <%-- 지도 영역 --%>
        <div id="smoking-map"></div>

        <%-- 흡연장 사진 영역 --%>
        <div id="smoking-photos" style="display: none;">
            <div id="photo-title"></div>
            <img id="smoking-photo" alt="흡연장 사진">
            <button onclick="closePhoto()">닫기</button>
        </div>

    </div>

</div>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=eec8e69f7553e61a39348fff684dd5c6&autoload=false"></script>
<script>
    kakao.maps.load(function() {
        var container = document.getElementById('smoking-map');
        var options = {
            center : new kakao.maps.LatLng(35.564887329486496, 129.32046843019748),
            level : 2
        };
        var map = new kakao.maps.Map(container, options);

        // 흡연장 마커 정보
        var smokingAreas = [
            {
                lat : 35.56529749843293,
                lng : 129.32073941419753,
                title : '흡연장 1',
                photo : '/images/smoking_area_1.png'
            },
            {
                lat : 35.56527636426698,
                lng : 129.32066712401362,
                title : '흡연장 2',
                photo : '/images/smoking_area_2.png'
            }
        ];

        smokingAreas.forEach(function(area) {
            var markerPosition = new kakao.maps.LatLng(area.lat, area.lng);
            var marker = new kakao.maps.Marker({
                position : markerPosition,
                title : area.title
            });
            marker.setMap(map);

            // 마커 클릭 시 사진 표시
            kakao.maps.event.addListener(marker, 'click', function() {
                document.getElementById('photo-title').innerText = area.title;
                document.getElementById('smoking-photo').src = area.photo;
                document.getElementById('smoking-photos').style.display = 'block';
            });
        });
    });

    function closePhoto() {
        document.getElementById('smoking-photos').style.display = 'none';
    }
</script>