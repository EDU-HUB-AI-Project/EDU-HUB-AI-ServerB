<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="/resources/common/components.css">
<link rel="stylesheet" href="/resources/classroom/classroom.css">

<div id="classroom-container">
    <div class="contents-wrap">

    <div class="title-wrap classroom-header">
        <h2>강의실 <span>안내</span></h2>
        <div class="guide-box guide-box--sub">
            <p>층별 강의실 배치도를 확인할 수 있습니다.</p>
        </div>
    </div>

    <div class="classroom-layout">

        <div class="floor-sidebar">
            <div class="sidebar-sticky">
                <p class="sidebar-label">층 선택</p>
                <div class="floor-buttons">
                    <!-- 동적 생성 -->
                </div>
            </div>
        </div>

        <div class="classroom-content">

            <div class="floor-plan-section">
                <div class="section-header">
                    <h3 class="section-title"><span id="floor-title">1</span>층 배치도</h3>
                    <div class="section-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z"/>
                            <path d="M12 12l9-4.5M12 12v9M12 12L3 7.5"/>
                        </svg>
                        <span>Floor Plan</span>
                    </div>
                </div>

                <div class="floor-plan-display">
                    <div id="floor-map-area">
                        <!-- SVG 동적 로드 -->
                    </div>
                    <div id="no-image" style="display:none;">배치도 준비 중입니다.</div>
                </div>
            </div>

            <div class="classroom-list-section">
                <div class="section-header">
                    <div id="plan-icon" class="plan-icon icon-box icon-box-lg icon-blue">
                        <span class="plan-number">1</span>
                    </div>
                    <h3 class="section-title">강의실 목록</h3>
                </div>
                <div id="classroom-grid" class="classroom-grid"></div>
            </div>

        </div>
    </div>

    </div>
</div>

<script>
var classroomData = [
    <c:forEach items="${classroomList}" var="c" varStatus="s">
    {
        classroomId: "${c.classroomId}",
        classroomName: "${c.classroomName}",
        floor: ${c.floor},
        imageId: "${c.imageId}",
        imagePath: "${c.imagePath}"
    }<c:if test="${!s.last}">,</c:if>
    </c:forEach>
];
</script>
<script src="/resources/classroom/classroom.js"></script>
<script>
    initClassroom(classroomData);
    selectFloor(1);
</script>