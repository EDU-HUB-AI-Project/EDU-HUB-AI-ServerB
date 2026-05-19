<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/classroom/classroom.css">
<div id="classroom-container">
    <div id="classroom-title">
        🏫 강의실 안내
    </div>
    
    <div id="floor-tabs">
        <button type="button" class="floor-btn" onclick="changeFloor(1, this)">1F</button>
        <button type="button" class="floor-btn" onclick="changeFloor(2, this)">2F</button>
        <button type="button" class="floor-btn active" onclick="changeFloor(3, this)">3F</button>
        <button type="button" class="floor-btn" onclick="changeFloor(4, this)">4F</button>
    </div>
    
    <div id="floor-map">
        <img id="floor-img" src="${pageContext.request.contextPath}/images/floor_3f.png" alt="3층 강의실 배치도">
        
        <%-- 1층 레이블 --%>
        <div class="floor-labels" id="labels-1" style="display:none;">
        	<div class="room-label" id="label-대강당">대강당</div>
        	<div class="room-label" id="label-유체역학">유체역학실험실습실</div>
        	<div class="room-label" id="label-밀폐공간">밀페공간<br>실습실</div>
        	<div class="room-label" id="label-건조설비">건조설비실습실</div>
        	<div class="room-label" id="label-건설안전">건설안전실습실</div>
        	<div class="room-label" id="label-기계종합">기계종합실습실</div>
        	<div class="room-label" id="label-줄걸이">줄걸이프레스<br>실습실</div>
        	<div class="room-label" id="label-크레인">크레인실습실</div>
        </div>
        
	    <%-- 2층 레이블 --%>
	    <div class="floor-labels" id="labels-2" style="display:none;">
			<div class="room-label" id="label-201강의실">201강의실</div>
			<div class="room-label" id="label-202강의실">202강의실</div>
			<div class="room-label" id="label-청력보존">청력보전<br>실습실</div>
			<div class="room-label" id="label-위험물">위험물<br>취급실습실</div>
			<div class="room-label" id="label-화학설비">화학설비<br>실습실</div>
			<div class="room-label" id="label-203강의실">203강의실</div>
			<div class="room-label" id="label-작업환경">작업환경측정<br>실습실</div>
			<div class="room-label" id="label-휴먼에러">휴먼에러<br>실습실</div>
			<div class="room-label" id="label-204강의실">204강의실</div>
			<div class="room-label" id="label-건강증진">건강증진<br>실습실</div>
			<div class="room-label" id="label-쉼터">교육생쉼터</div>
	    </div>
	
	    <%-- 3층 레이블 --%>
	    <div class="floor-labels" id="labels-3">
			<div class="room-label" id="label-301강의실">301강의실</div>
			<div class="room-label" id="label-302강의실">302강의실</div>
			<div class="room-label" id="label-컴퓨터실습실">컴퓨터실습실</div>
			<div class="room-label" id="label-교재보관고">교제보관고</div>
			<div class="room-label" id="label-분임토의실1">분임토의실</div>
			<div class="room-label" id="label-분임토의실2">분임토의실</div>
			<div class="room-label" id="label-분임토의실3">분임토의실</div>
			<div class="room-label" id="label-분임토의실4">분임토의실</div>
			<div class="room-label" id="label-303강의실">303강의실</div>
			<div class="room-label" id="label-석면실습실">석면실습실</div>
			<div class="room-label" id="label-소음진동실습실2">소음진동<br>실습실2</div>
			<div class="room-label" id="label-소음진동실습실1">소음진동<br>실습실1</div>
			<div class="room-label" id="label-전기기초">전기기초실<br>실무실습실</div>
			<div class="room-label" id="label-전기안전점검">전기안전<br>점검실습실</div>
			<div class="room-label" id="label-인간공학">인간공학<br>실습실</div>
			<div class="room-label" id="label-교재보관고2">교재보관고</div>
			<div class="room-label" id="label-방폭전기실습실">방폭전기실습실</div>
			<div class="room-label" id="label-304강의실">304강의실</div>
			<div class="room-label" id="label-305강의실">305강의실</div>
			<div class="room-label" id="label-306강의실">306강의실</div>
			<div class="room-label" id="label-보호구실습실">보호구실습실</div>
			<div class="room-label" id="label-국소배기">국소배기장치<br>실습실 및 강의실</div>
	    </div>
	
	    <%-- 4층 레이블 --%>
	    <div class="floor-labels" id="labels-4" style="display:none;">
			<div class="room-label" id="label-교육기획부">교육기획부</div>
			<div class="room-label" id="label-전문교육부">전문교육부</div>
			<div class="room-label" id="label-특정교육부">특정교육부</div>
			<div class="room-label" id="label-교수실">교수실</div>
			<div class="room-label" id="label-교육운영실">교육운영실</div>
			<div class="room-label" id="label-교육원장실">교육원장실</div>
			<div class="room-label" id="label-소회의실Ⅰ">소회의실Ⅰ</div>
			<div class="room-label" id="label-소회의실Ⅱ">소회의실Ⅱ</div>
			<div class="room-label" id="label-교육운영실장실">교육<br>운영실장실</div>
			<div class="room-label" id="label-교수실장실">교수실장실</div>
			<div class="room-label" id="label-EDU-콜센터">EDU-콜센터</div>
			<div class="room-label" id="label-이러닝교육부">이러닝교육부</div>
			<div class="room-label" id="label-중회의실">중회의실</div>
			<div class="room-label" id="label-물품창고">물품창고</div>
			<div class="room-label" id="label-410호">410호<br>교수실<br>#1</div>
			<div class="room-label" id="label-411호">411호<br>교수실<br>#2</div>
			<div class="room-label" id="label-412호">412호<br>교수실<br>#3</div>
			<div class="room-label" id="label-413호">413호<br>교수실<br>#4</div>
			<div class="room-label" id="label-414호">414호<br>교수실<br>#5</div>
			<div class="room-label" id="label-415호">415호<br>스마트<br>워크룸</div>
			<div class="room-label" id="label-416호">416호<br>교수실<br>#6</div>
			<div class="room-label" id="label-417호">417호<br>교수실<br>#7</div>
			<div class="room-label" id="label-418호">418호<br>교수실<br>#8</div>
			<div class="room-label" id="label-419호">419호<br>교수실<br>#9</div>
			<div class="room-label" id="label-420호">420호<br>교수실<br>#10</div>
			<div class="room-label" id="label-421호">421호<br>교수실<br>#11</div>
			<div class="room-label" id="label-422호">422호<br>교수실<br>#12</div>
			<div class="room-label" id="label-423호">423호<br>교수실<br>#13</div>
			<div class="room-label" id="label-KOSHA기록관">KOSHA기록관<br>(교육원)</div>
			<div class="room-label" id="label-402강의실">402강의실</div>
			<div class="room-label" id="label-401강의실">401강의실</div>
	    </div>
        
        <div id="no-image" style="display:none;">
            <p>해당 층 도면은 준비 중입니다.</p>
        </div>
    </div>
</div>