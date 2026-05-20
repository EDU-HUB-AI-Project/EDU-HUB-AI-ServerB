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
    
    <div id="floor-map">

        <img id="floor-img" src="/images/eduInfo/floor_1f.png" alt="1층 강의실 배치도">
        
        <div id="no-image" style="display:none;">
            <p>해당 층 도면은 준비 중입니다.</p>
        </div>
    </div>
</div>
<script>
    var contextPath = '';
</script>
<script src="/resources/classroom/classroom.js"></script>