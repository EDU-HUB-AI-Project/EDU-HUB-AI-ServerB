var activeFacilityId;
var mapResizeBound = false;

function initLocationPage() {
    if (!facilityData || facilityData.length === 0) {
        return;
    }

    renderLocationTabs();
    selectFacilityTab(facilityData[0].facilityId);
}

function renderLocationTabs() {
    var tabsEl = document.getElementById('location-tabs');
    if (!tabsEl) {
        return;
    }

    tabsEl.innerHTML = '';
    facilityData.forEach(function(f) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tab-pill';
        btn.setAttribute('data-facility-id', f.facilityId);
        btn.textContent = f.name || f.facilityId;
        btn.addEventListener('click', function() {
            selectFacilityTab(f.facilityId);
        });
        tabsEl.appendChild(btn);
    });
}

function selectFacilityTab(facilityId) {
    var facility = facilityData.find(function(f) {
        return f.facilityId === facilityId;
    });
    if (!facility) {
        return;
    }

    activeFacilityId = facilityId;

    document.querySelectorAll('#location-tabs .tab-pill').forEach(function(tab) {
        tab.classList.toggle('active', tab.getAttribute('data-facility-id') === facilityId);
    });

    var infoTitle = document.getElementById('location-info-title');
    var locationText = document.getElementById('location-text');
    var descriptionEl = document.getElementById('location-description');
    var photoTitle = document.getElementById('photo-title');

    if (infoTitle) infoTitle.textContent = facility.name || '시설 안내';
    if (locationText) locationText.textContent = formatLocationLabel(facility);
    if (descriptionEl) descriptionEl.textContent = facility.description || '-';
    if (photoTitle) photoTitle.textContent = facility.name || '';

    renderPhotos(facility);
    updateMapSection(facility);
    updateFloorSection(facility);
    runLocationAnimations();
}

function isInnerFacility(facility) {
    if (!facility || !facility.facilityType) {
        return false;
    }
    return facility.facilityType.trim().toUpperCase() === 'INNER';
}

function formatFloorLabel(floor) {
    if (floor === null || floor === undefined || floor === '') {
        return '-';
    }
    var text = String(floor).trim();
    if (!text) {
        return '-';
    }
    if (text.indexOf('층') >= 0) {
        return text;
    }
    return text + '층';
}

function updateFloorSection(facility) {
    var floorSection = document.getElementById('location-floor-section');
    var floorEl = document.getElementById('location-floor');
    if (!floorSection || !floorEl) {
        return;
    }

    if (isInnerFacility(facility)) {
        floorSection.style.display = 'flex';
        floorEl.textContent = formatFloorLabel(facility.floor);
    } else {
        floorSection.style.display = 'none';
        floorEl.textContent = '-';
    }
}

function isOuterFacility(facility) {
    if (!facility || !facility.facilityType) {
        return false;
    }
    return facility.facilityType.trim().toUpperCase() === 'OUTER';
}

function updateMapSection(facility) {
    var mapSection = document.getElementById('location-map-section');
    if (!mapSection) {
        return;
    }

    if (isOuterFacility(facility)) {
        mapSection.style.display = 'block';
        renderCampusMap(facility);
        bindMapResize();
    } else {
        mapSection.style.display = 'none';
        hideMapMarker();
    }
}

function formatLocationLabel(facility) {
    if (!facility || !facility.location) {
        return '-';
    }
    return String(facility.location).trim() || '-';
}

function hasMapCoords(facility) {
    if (!facility) {
        return false;
    }
    var x = parseCoord(facility.mapX);
    var y = parseCoord(facility.mapY);
    return x !== null && y !== null;
}

function parseCoord(value) {
    if (value === null || value === undefined || value === '') {
        return null;
    }
    var num = parseFloat(value);
    return isNaN(num) ? null : num;
}

function getPhotoPaths(imagePath) {
    if (!imagePath) {
        return [];
    }
    return imagePath.split(/[|,]/).map(function(p) {
        return p.trim();
    }).filter(function(p) {
        return p.length > 0;
    });
}

function renderPhotos(facility) {
    var section = document.getElementById('location-photo-section');
    var container = document.getElementById('photo-container');
    if (!section || !container) {
        return;
    }

    var photos = getPhotoPaths(facility.imagePath);
    container.innerHTML = '';

    if (photos.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    photos.forEach(function(src, index) {
        var item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML =
            '<img src="' + escapeAttr(src) + '" alt="' + escapeAttr(facility.name) + '" class="gallery-img">' +
            // '<div class="photo-overlay"><span class="photo-label">' + escapeHtml(facility.name) + ' ' + (index + 1) + '</span></div>';
        container.appendChild(item);
    });
}

// 캠퍼스 지도 + 픽셀 좌표 마커
function renderCampusMap(facility) {
    var img = document.getElementById('location-map-img');
    var marker = document.getElementById('location-map-marker');
    if (!img || !marker) {
        return;
    }

    if (!hasMapCoords(facility)) {
        hideMapMarker();
        return;
    }

    var mapX = parseCoord(facility.mapX);
    var mapY = parseCoord(facility.mapY);

    function placeMarker() {
        if (!img.naturalWidth || !img.naturalHeight) {
            return;
        }
        var pos = imagePointToWrap(mapX, mapY, img);
        marker.style.left = pos.left + 'px';
        marker.style.top = pos.top + 'px';
        marker.classList.remove('is-hidden');
    }

    if (img.complete && img.naturalWidth) {
        placeMarker();
    } else {
        img.onload = placeMarker;
    }
}

function hideMapMarker() {
    var marker = document.getElementById('location-map-marker');
    if (marker) {
        marker.classList.add('is-hidden');
    }
}

function getMapDisplayRect(img) {
    var wrap = img.closest('.location-map-wrap');
    if (!wrap) {
        return null;
    }

    var wrapW = wrap.clientWidth;
    var wrapH = wrap.clientHeight;
    var imgW = img.naturalWidth;
    var imgH = img.naturalHeight;
    if (!wrapW || !wrapH || !imgW || !imgH) {
        return null;
    }

    var ratio = Math.min(wrapW / imgW, wrapH / imgH);
    var w = Math.max(1, imgW * ratio);
    var h = Math.max(1, imgH * ratio);

    return {
        x: (wrapW - w) / 2,
        y: (wrapH - h) / 2,
        width: w,
        height: h
    };
}

function imagePointToWrap(mapX, mapY, img) {
    var display = getMapDisplayRect(img);
    if (!display) {
        return { left: 0, top: 0 };
    }

    var relX = mapX / img.naturalWidth;
    var relY = mapY / img.naturalHeight;

    return {
        left: display.x + relX * display.width,
        top: display.y + relY * display.height
    };
}

function bindMapResize() {
    if (mapResizeBound) {
        repositionActiveMarker();
        return;
    }

    mapResizeBound = true;
    window.addEventListener('resize', repositionActiveMarker);
}

function repositionActiveMarker() {
    if (!activeFacilityId) {
        return;
    }
    var facility = facilityData.find(function(f) {
        return f.facilityId === activeFacilityId;
    });
    if (facility && isOuterFacility(facility)) {
        renderCampusMap(facility);
    }
}

function runLocationAnimations() {
    var mapSection = document.getElementById('location-map-section');
    if (mapSection && mapSection.style.display !== 'none') {
        mapSection.style.opacity = '0';
        mapSection.style.transform = 'translateY(20px)';
        setTimeout(function() {
            mapSection.style.opacity = '1';
            mapSection.style.transform = 'translateY(0)';
        }, 100);
    }

    var infoCards = document.querySelectorAll('.info-cards .info-card');
    var visibleIndex = 0;
    infoCards.forEach(function(card) {
        if (card.style.display === 'none') {
            return;
        }
        var animIndex = visibleIndex;
        visibleIndex += 1;
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (animIndex * 100));
    });

    var galleryItems = document.querySelectorAll('#photo-container .gallery-item');
    galleryItems.forEach(function(item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, 600 + (index * 150));
    });
}

function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeAttr(text) {
    return escapeHtml(text).replace(/"/g, '&quot;');
}
