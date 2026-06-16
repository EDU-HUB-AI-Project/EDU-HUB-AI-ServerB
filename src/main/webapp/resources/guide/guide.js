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

function buildSubjectInfoEl(subject) {
    var $info = $('<div>').addClass('subject-info');

    var $room = $('<div>').addClass('subject-info-item');
    $('<span>').addClass('subject-info-label').text('강의실').appendTo($room);
    $('<span>').addClass('subject-info-value').text(subject.CLASSROOM_NAME).appendTo($room);

    var $floor = $('<div>').addClass('subject-info-item');
    $('<span>').addClass('subject-info-label').text('층').appendTo($floor);
    $('<span>').addClass('subject-info-value').text(subject.FLOOR + '층').appendTo($floor);

    return $info.append($room).append($floor);
}

function selectSubject(subjects, index, $tabs, $panels) {
    $tabs.find('.tab-pill').removeClass('active');
    $tabs.find('.tab-pill[data-index="' + index + '"]').addClass('active');
    $panels.find('.subject-panel').removeClass('active');
    $panels.find('.subject-panel[data-index="' + index + '"]').addClass('active');
    loadClassroomSvg(subjects[index].IMAGE_PATH, subjects[index].IMAGE_ID);
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
        var single = subjects[0];
        var $wrap = $('<div>').addClass('subject-wrap subject-wrap--single');
        $wrap.append(buildSubjectInfoEl(single));
        $area.append($wrap);
        loadClassroomSvg(single.IMAGE_PATH, single.IMAGE_ID);
        return;
    }

    var $wrap = $('<div>').addClass('subject-wrap');
    var $tabs = $('<div>').addClass('tab-pills tab-pills--accent').attr('role', 'tablist');
    var $panels = $('<div>').addClass('subject-panels');

    $.each(subjects, function(i, subject) {
        var $btn = $('<button>')
            .attr({ type: 'button', 'data-index': i, role: 'tab' })
            .addClass('tab-pill')
            .text(subject.SUBJECT_NAME)
            .on('click', function() {
                selectSubject(subjects, i, $tabs, $panels);
            });

        if(i === 0) {
            $btn.addClass('active');
        }
        $tabs.append($btn);

        var $panel = $('<div>')
            .addClass('subject-panel')
            .attr({ 'data-index': i, role: 'tabpanel' });

        if(i === 0) {
            $panel.addClass('active');
        }

        $panel.append(buildSubjectInfoEl(subject));
        $panels.append($panel);
    });

    $wrap.append($tabs).append($panels);
    $area.append($wrap);
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
                    .css({
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto'
                    });
            }

            var target = $container.find('#' + imageId)[0];

            if(target) {
                $(target).addClass('room-highlight');
                $fallback.hide();
                $mapArea.css('display', 'flex');
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
