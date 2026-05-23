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
<script src="/resources/smoking/smoking.js"></script>
<script>
    initSmokingMap();
</script>