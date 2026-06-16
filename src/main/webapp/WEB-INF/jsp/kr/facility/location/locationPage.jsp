<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="location-container">
    <div class="contents-wrap">

        <div class="title-wrap" id="location-title">
            <h2>시설 <span>안내</span></h2>
            <!-- <div class="guide-box guide-box--sub">
                <p>캠퍼스 내 시설 위치를 확인할 수 있습니다.</p>
            </div> -->
        </div>

        <div class="subpage-body">
            <c:if test="${serverError}">
                <div class="location-empty">시설 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</div>
            </c:if>

            <c:choose>
                <c:when test="${empty facilityList}">
                    <div class="location-empty">등록된 시설 위치가 없습니다.</div>
                </c:when>
                <c:otherwise>
                    <div id="location-tabs" class="tab-pills" role="tablist"></div>

                    <div class="photo-section" id="location-photo-section" style="display:none;">
                        <!-- <h3 class="section-title">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                            </svg>
                            <span id="photo-title"></span>
                        </h3> -->
                        <div id="photo-container" class="photo-gallery"></div>
                    </div>

                    <div class="map-section" id="location-map-section" style="display:none;">
                        <div id="location-campus-map" class="location-campus-map">
                            <div class="location-map-wrap">
                                <img id="location-map-img" src="/images/facility-location-map.png" alt="공단 지도">
                                <div id="location-map-marker-layer" class="location-map-marker-layer">
                                    <div id="location-map-marker" class="location-map-marker is-hidden">
                                        <span class="location-map-marker-ping"></span>
                                        <span class="location-map-marker-dot"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="info-section">
                        <h3 class="location-section-title">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <span id="location-info-title">시설 안내</span>
                        </h3>
                        <div class="location-info-panel">
                            <div class="location-meta-card" id="location-meta-card">
                                <div class="location-meta-row">
                                    <div class="location-meta-item">
                                        <div class="location-meta-header">
                                            <span class="location-meta-icon" aria-hidden="true">
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                                    <circle cx="12" cy="10" r="3"/>
                                                </svg>
                                            </span>
                                            <span class="location-meta-label">위치</span>
                                        </div>
                                        <span class="location-meta-value" id="location-text">-</span>
                                    </div>
                                    <div class="location-meta-item" id="location-floor-wrap">
                                        <div class="location-meta-header">
                                            <span class="location-meta-icon" aria-hidden="true">
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                                    <polyline points="9 22 9 12 15 12 15 22"/>
                                                </svg>
                                            </span>
                                            <span class="location-meta-label">층수</span>
                                        </div>
                                        <span class="location-meta-value" id="location-floor">-</span>
                                    </div>
                                </div>
                            </div>
                            <div class="location-desc-card">
                                <div class="location-desc-header">
                                    <span class="location-desc-icon" aria-hidden="true">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                            <polyline points="14 2 14 8 20 8"/>
                                        </svg>
                                    </span>
                                    <span class="location-desc-label">안내</span>
                                </div>
                                <p class="location-desc-text" id="location-description">-</p>
                            </div>
                        </div>
                    </div>
                </c:otherwise>
            </c:choose>
        </div>

    </div>
</div>

<script>
var facilityData = [
    <c:forEach items="${facilityList}" var="f" varStatus="s">
    {
        facilityId: "<c:out value='${f.facilityId}'/>",
        facilityType: "<c:out value='${f.facilityType}'/>",
        name: "<c:out value='${f.name}'/>",
        location: "<c:out value='${f.location}'/>",
        imagePath: "<c:out value='${f.imagePath}'/>",
        description: "<c:out value='${f.description}'/>",
        floor: <c:choose><c:when test="${f.floor != null}">${f.floor}</c:when><c:otherwise>null</c:otherwise></c:choose>,
        mapX: <c:choose><c:when test="${f.mapX != null}">${f.mapX}</c:when><c:otherwise>null</c:otherwise></c:choose>,
        mapY: <c:choose><c:when test="${f.mapY != null}">${f.mapY}</c:when><c:otherwise>null</c:otherwise></c:choose>
    }<c:if test="${!s.last}">,</c:if>
    </c:forEach>
];
</script>
<script src="/resources/location/location.js"></script>
<script>
    if (typeof initLocationPage === 'function') {
        initLocationPage();
    }
</script>
