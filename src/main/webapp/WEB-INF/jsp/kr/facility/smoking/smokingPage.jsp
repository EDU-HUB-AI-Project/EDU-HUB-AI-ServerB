<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/smoking/smoking.css">
<script>
    var KAKAO_MAP_KEY = '${kakaoMapKey}';
</script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false"></script>

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
  initSmokingMap();
</script>