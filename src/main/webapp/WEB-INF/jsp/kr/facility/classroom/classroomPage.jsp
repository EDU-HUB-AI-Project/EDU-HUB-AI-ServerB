<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/classroom/classroom.css">
<div id="classroom-container">
    <div id="classroom-title">
        🏫 강의실 안내
    </div>
    
    <div id="floor-tabs">
        <button type="button" class="floor-btn active" onclick="changeFloor(1, this)">1F</button>
        <button type="button" class="floor-btn" onclick="changeFloor(2, this)">2F</button>
        <button type="button" class="floor-btn" onclick="changeFloor(3, this)">3F</button>
        <button type="button" class="floor-btn" onclick="changeFloor(4, this)">4F</button>
    </div>
    
    <div id="floor-content">
        
        <%-- 왼쪽: 도면 영역 --%>
        <div id="floor-map">
            <img id="floor-img" src="/images/floor_1f/floor_1f.png" alt="1층 강의실 배치도">

            <%-- 강의실 강조 이미지 --%>
            <img id="area_대강당" src="/images/floor_1f/area/area_대강당.svg" style="display:none;">
            <img id="area_유체역학" src="/images/floor_1f/area/area_유체역학.svg" style="display:none;">
            <img id="area_밀폐공간" src="/images/floor_1f/area/area_밀폐공간.svg" style="display:none;">
            <img id="area_건설안전" src="/images/floor_1f/area/area_건설안전.svg" style="display:none;">
            <img id="area_건설안전2" src="/images/floor_1f/area/area_건설안전2.svg" style="display:none;">
            <img id="area_기계종합" src="/images/floor_1f/area/area_기계종합.svg" style="display:none;">
            <img id="area_줄걸이" src="/images/floor_1f/area/area_줄걸이.svg" style="display:none;">
            <img id="area_크레인" src="/images/floor_1f/area/area_크레인.svg" style="display:none;">
            
            <div id="no-image" style="display:none;">
                <p>해당 층 도면은 준비 중입니다.</p>
            </div>
        </div>

        <%-- 오른쪽: 도면 영역 --%>
        <div id="room-list-1">
            <ul id="floor-ul">
                <li>
                    1층
                    <ul id="room-ul-1">
                        <li onclick="highlightRoom('area_대강당')">대강당</li>
                        <li onclick="highlightRoom('area_유체역학')">유체역학실험실습실</li>
                        <li onclick="highlightRoom('area_밀폐공간')">밀폐공간실습실</li>
                        <li onclick="highlightRoom('area_건설안전')">건설안전실습실</li>
                        <li onclick="highlightRoom('area_건설안전2')">건설안전실습실</li>
                        <li onclick="highlightRoom('area_기계종합')">기계종합실습실</li>
                        <li onclick="highlightRoom('area_줄걸이')">줄걸이ㆍ프레스실습실</li>
                        <li onclick="highlightRoom('area_크레인')">크레인실습실</li>
                    </ul>
                </li>
                <li>2층</li>
                <li>3층</li>
                <li>4층</li>
            </ul>
        </div>
    </div>
</div>
<script>
    var contextPath = '';
</script>
<script src="/resources/classroom/classroom.js"></script>
<script>
    var roomList = document.getElementById('room-list-1');
    if(roomList) roomList.style.display = 'flex';
</script>