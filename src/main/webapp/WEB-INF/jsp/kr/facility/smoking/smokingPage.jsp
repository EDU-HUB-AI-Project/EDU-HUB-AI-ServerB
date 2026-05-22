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
        <div id="smoking-photos">
            <div id="photo-title"></div>
            <div id="photo-container">
                <img id="smoking-photo-1" alt="흡연장 사진 1">
                <img id="smoking-photo-2" alt="흡연장 사진 2">
            </div>
        </div>

    </div>

</div>
<script>
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

</script>