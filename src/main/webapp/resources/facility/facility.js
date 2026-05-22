function loadFacilityPage(url) {
    $('#content-area').load(url, function() {
        if(typeof initSmokingMap === 'function' && document.getElementById('smoking-map')) {
            initSmokingMap();
        }
        if(typeof initTransportMap === 'function' && document.getElementById('map')) {
            initTransportMap();
        }
    })
}