function initDormCanvas(dormRoom) {
    if(!dormRoom) return;

    var floor = parseInt(dormRoom.charAt(0));

    if(!floor) return;

    fetch('/images/dormInfo/dorm_' + floor + 'f.svg')
        .then(function(res) {return res.text(); })
        .then(function(svgText) {
            var container = document.getElementById('dorm-svg-container');
            container.innerHTML = svgText;

            var svgEl = container.querySelector('svg');
            if(svgEl) {
                svgEl.removeAttribute('width');
                svgEl.removeAttribute('height');
                svgEl.style.width = '100%';
                svgEl.style.height = 'auto';
            }

            var target = container.querySelector('#room-' + dormRoom);
            if(target) {
                target.classList.add('dorm-highlight');
                $('#dorm-modal-title').text(dormRoom + '호 위치');
                $('#dorm-map-fallback').hide();
                $('#dorm-map-btn-wrap').show();
            }
        })
        .catch(function() {

        });
}

function renderSubject(subjects) {
    var $area = $('#subject-list-area');
    $area.empty();

    $('#classroom-map-area').hide();
    $('#classroom-map-fallback').hide();
    $('#svg-container').empty();

    if(!subjects || subjects.length === 0) {
        $area.append($('<div>').addClass('no-subject-msg').text('오늘 수업 없음'));
        return;
    }

    if(subjects.length === 1) {
        var s = subjects[0];
        var $single = $('<div>').addClass('subject-single');
        $('<div>').addClass('info-label').text(s.SUBJECT_NAME).appendTo($single);
        $('<div>').addClass('info-value').text(s.CLASSROOM_NAME).appendTo($single);
        $('<div>').addClass('info-floor').text(s.FLOOR + '층').appendTo($single);
        $area.append($single);

        loadClassroomSvg(s.IMAGE_PATH, s.IMAGE_ID);
        return;
    }

    var $tabs = $('<div>').addClass('subject-tabs');
    var $panels = $('<div>').addClass('subject-panels');

    $.each(subjects, function(i, s) {
        var $btn = $('<button>')
            .attr('type', 'button')
            .addClass('subject-tab-btn')
            .text(s.SUBJECT_NAME)
            .on('click', function() {
                $('.subject-tab-btn').removeClass('active');
                $('.subject-panel').removeClass('active');
                $(this).addClass('active');
                $panels.find('[data-index="' + i + '"]').addClass('active');
                
                loadClassroomSvg(s.IMAGE_PATH, s.IMAGE_ID);
            });
        
        if(i === 0) {
            $btn.addClass('active');
        }
        $tabs.append($btn);

        var $panel = $('<div>').addClass('subject-panel').attr('data-index', i);

        if(i === 0) {
            $panel.addClass('active');
        }

        $('<div>').addClass('info-label').text(s.SUBJECT_NAME).appendTo($panel);
        $('<div>').addClass('info-value').text(s.CLASSROOM_NAME).appendTo($panel);
        $('<div>').addClass('info-floor').text(s.FLOOR + '층').appendTo($panel);
        $panels.append($panel);
    });

    $area.append($tabs).append($panels);
    loadClassroomSvg(subjects[0].IMAGE_PATH, subjects[0].IMAGE_ID);
}

function loadClassroomSvg(imagePath, imageId) {
    var $mapArea = $('#classroom-map-area');
    var $fallback = $('#classroom-map-fallback');
    var $container = $('#svg-container');

    $container.empty();
    $mapArea.hide();
    $fallback.hide();

    if(!imagePath || !imageId) {
        $fallback.show();
        return;
    }

    fetch(imagePath)
        .then(function(res) { return res.text(); })
        .then(function(svgText) {
            $container.html(svgText);

            var svgEl = $container.find('svg')[0];

            if(svgEl) {
                $(svgEl).removeAttr('width')
                    .removeAttr('height')
                    .css({width : '100%', height: 'auto'});
            }

            var target = $container.find('#' + imageId)[0];

            if(target) {
                $(target).addClass('room-highlight');
                $fallback.hide();
                $mapArea.show();
            }
            else {
                $mapArea.hide();
                $fallback.show();
            }
        })
        .catch(function() {
            $mapArea.hide();
            $fallback.show();
        });
}


function openDormModal() {
    $('#dorm-modal-overlay').addClass('open');
}

function closeDormModal() {
    $('#dorm-modal-overlay').removeClass('open');
}