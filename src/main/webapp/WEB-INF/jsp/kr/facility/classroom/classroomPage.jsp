<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>



<div id="classroom-container">

    <div class="contents-wrap">



        <div class="title-wrap classroom-header">

            <h2>강의실 <span>안내</span></h2>

            <!-- <div class="guide-box guide-box--sub">

                <p>층별 강의실 배치도를 확인할 수 있습니다.</p>

            </div> -->

        </div>



        <div class="subpage-body">



            <div id="classroom-floor-tabs" class="tab-pills" role="tablist" aria-label="층 선택"></div>



            <div class="classroom-plan-card">

                <h3 class="classroom-section-title">

                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">

                        <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z"/>

                        <path d="M12 12l9-4.5M12 12v9M12 12L3 7.5"/>

                    </svg>

                    <span class="classroom-section-heading"><span id="floor-title">1</span>층 배치도</span>

                </h3>

                <div class="classroom-plan-display">

                    <div id="floor-map-area"></div>

                    <div id="no-image" class="classroom-plan-empty" style="display:none;">배치도 준비 중입니다.</div>

                </div>

            </div>



            <div class="classroom-list-card">

                <h3 class="classroom-section-title">

                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">

                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>

                        <polyline points="9 22 9 12 15 12 15 22"/>

                    </svg>

                    강의실 <span>목록</span>

                </h3>

                <div id="classroom-grid" class="classroom-grid"></div>

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

