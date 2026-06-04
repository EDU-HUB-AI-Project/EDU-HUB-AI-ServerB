var locationMap;
var locationMarker;
var activeFacilityId;

var DEFAULT_CENTER = { lat: 35.565283, lng: 129.320682 };

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
        btn.className = 'location-tab';
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

    document.querySelectorAll('.location-tab').forEach(function(tab) {
        tab.classList.toggle('active', tab.getAttribute('data-facility-id') === facilityId);
    });

    var infoTitle = document.getElementById('location-info-title');
    var locationText = document.getElementById('location-text');
    var descriptionEl = document.getElementById('location-description');
    var photoTitle = document.getElementById('photo-title');

    if (infoTitle) infoTitle.textContent = facility.name || '시설 안내';
    if (locationText) locationText.textContent = formatLocationLabel(facility.location);
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
        initLocationMap(facility);
    } else {
        mapSection.style.display = 'none';
        if (locationMarker) {
            locationMarker.setMap(null);
            locationMarker = null;
        }
    }
}

function formatLocationLabel(location) {
    if (!location) {
        return '-';
    }
    if (parseLatLng(location)) {
        return '지도 마커 참조';
    }
    return location;
}

function parseLatLng(location) {
    if (!location) {
        return null;
    }
    var parts = location.split(',');
    if (parts.length !== 2) {
        return null;
    }
    var lat = parseFloat(parts[0].trim());
    var lng = parseFloat(parts[1].trim());
    if (isNaN(lat) || isNaN(lng)) {
        return null;
    }
    return { lat: lat, lng: lng };
}

function getCoords(facility) {
    var parsed = parseLatLng(facility.location);
    if (parsed) {
        return parsed;
    }
    return DEFAULT_CENTER;
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
            '<div class="photo-overlay"><span class="photo-label">' + escapeHtml(facility.name) + ' ' + (index + 1) + '</span></div>';
        container.appendChild(item);
    });
}

function initLocationMap(facility) {
    if (typeof kakao === 'undefined' || !kakao.maps) {
        return;
    }

    setTimeout(function() {
        kakao.maps.load(function() {
            var container = document.getElementById('location-map');
            if (!container) {
                return;
            }

            var coords = getCoords(facility);
            var center = new kakao.maps.LatLng(coords.lat, coords.lng);
            var options = { center: center, level: 2 };

            if (!locationMap) {
                locationMap = new kakao.maps.Map(container, options);
            } else {
                locationMap.setCenter(center);
            }

            if (locationMarker) {
                locationMarker.setMap(null);
            }

            locationMarker = new kakao.maps.Marker({
                position: center,
                title: facility.name || ''
            });
            locationMarker.setMap(locationMap);

            locationMap.relayout();
            locationMap.setCenter(center);
        });
    }, 100);
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
    infoCards.forEach(function(card, index) {
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
