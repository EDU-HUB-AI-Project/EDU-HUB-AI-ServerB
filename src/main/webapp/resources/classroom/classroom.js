function changeFloor(floor, btn) {
    // 1. 탭 버튼 활성화 상태 변경
    var buttons = document.querySelectorAll('.floor-btn');
    buttons.forEach(function(b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    // 2. [SVG 수정] 모든 층 SVG 도면 내부의 강의실 하이라이트(active 클래스) 제거
    var allSvgAreas = document.querySelectorAll('.floor-map-wrap svg rect[id^="area_"], .floor-map-wrap svg path[id^="area_"]');
    allSvgAreas.forEach(function(area) {
        area.classList.remove('active');
    });

    // 3. 오른쪽 리스트 내의 모든 층별 세부 목록(ul)을 먼저 숨김
    var allRoomUls = document.querySelectorAll('[id^="room-ul-"]');
    allRoomUls.forEach(function(ul) {
        ul.style.display = 'none';
    });

    // 4. 선택한 층의 세부 목록(ul)만 자동으로 펼쳐서 노출
    var targetUl = document.getElementById('room-ul-' + floor);
    if (targetUl) {
        targetUl.style.display = 'block';
        
        // 2층 또는 3층인 경우 내부의 중분류(강의실/실습실) 세부 목록들도 기본적으로 다 열리도록 처리
        if (floor === 2 || floor === 3) {
            var nestedUls = targetUl.querySelectorAll('ul');
            nestedUls.forEach(function(subUl) {
                subUl.style.display = 'block';
            });
        }
    }

    // 5. [SVG 수정] 이미지 src 교체 대신 층별 통짜 SVG를 감싼 <div>를 켜고 끄는 방식으로 변경
    // 피그마 연동 시에는 바탕 도면과 하이라이트가 합쳐진 SVG를 사용하므로 이 방식이 안전합니다.
    var allMapWraps = document.querySelectorAll('.floor-map-wrap');
    allMapWraps.forEach(function(wrap) {
        wrap.style.display = 'none';
    });

    var targetFloorMap = document.getElementById('map-floor-' + floor);
    var noImage = document.getElementById('no-image');

    // 층별 도면 div 존재 유무에 따른 예외 처리 (4층 등 데이터 없을 때 대비)
    if (targetFloorMap) {
        targetFloorMap.style.display = 'block';
        if (noImage) noImage.style.display = 'none';
    } else {
        if (noImage) noImage.style.display = 'block';
    }
}

// [SVG 수정] 강의실 강조 함수
function highlightRoom(areaName, floor) {
    // 1. 현재 클릭한 강의실이 있는 층 도면 프레임이 닫혀있다면 강제로 띄워줌
    var targetFloorMap = document.getElementById('map-floor-' + floor);
    if (targetFloorMap && targetFloorMap.style.display === 'none') {
        // 상단 탭 버튼 엘리먼트 동기화 추출
        var targetBtn = document.querySelectorAll('.floor-btn')[floor - 1];
        changeFloor(floor, targetBtn);
    }

    // 2. 모든 SVG 내부 하이라이트(active 클래스) 초기화
    var allSvgAreas = document.querySelectorAll('.floor-map-wrap svg rect[id^="area_"], .floor-map-wrap svg path[id^="area_"]');
    allSvgAreas.forEach(function(area) {
        area.classList.remove('active');
    });

    // 3. 피그마에서 생성되어 삽입된 SVG 엘리먼트 ID를 찾아 active 클래스 부여
    var highlightTarget = document.getElementById(areaName);
    if (highlightTarget) {
        highlightTarget.classList.add('active');
    } else {
        console.error("SVG 내부에서 다음 강의실 ID를 찾을 수 없습니다: " + areaName);
    }
}

// 오른쪽 대분류(1층, 2층, 3층 글자) 클릭 시 토글 함수 (기존 코드 유지)
function toggleFloorList(floorNum) {
    var ul = document.getElementById('room-ul-' + floorNum);
    if (ul) {
        if (ul.style.display === 'none' || ul.style.display === '') {
            ul.style.display = 'block';
        } else {
            ul.style.display = 'none';
        }
    }
}

// 내부 중분류(강의실, 실습실 글자) 클릭 시 토글 함수 (기존 버블링 방지 및 매칭 코드 완벽 유지)
function toggleSubList(element) {
    if (window.event) {
        window.event.stopPropagation();
    }

    var ul = null;

    if (typeof element === 'string') {
        ul = document.getElementById(element);
        if (!ul) {
            var allLis = document.querySelectorAll('[id^="room-ul-"] > li');
            allLis.forEach(function(li) {
                if(li.textContent.includes(element.replace('sub-ul-', ''))) {
                    ul = li.querySelector('ul');
                }
            });
        }
    } 
    else if (element && element.tagName) {
        if (element.tagName === 'LI') {
            ul = element.querySelector('ul');
        } else {
            ul = element.parentElement.querySelector('ul');
        }
    }

    if (ul) {
        if (ul.style.display === 'none' || ul.style.display === '') {
            ul.style.display = 'block';
        } else {
            ul.style.display = 'none';
        }
    }
}

// 도면-리스트 양방향 연동 기능
document.addEventListener('DOMContentLoaded', function() {
    // 웹페이지 내부의 모든 하이라이트용 SVG 사각형 및 패스들을 실시간 감시 대상으로 등록
    var svgRooms = document.querySelectorAll('.floor-map-wrap svg rect[id^="area_"], .floor-map-wrap svg path[id^="area_"]');
    
    svgRooms.forEach(function(room) {
        // 도면 위 사각형을 클릭했을 때의 동작 정의
        room.addEventListener('click', function() {
            var roomId = this.id; // 내가 방금 클릭한 사각형의 ID 추출 (예: 'area_201_room')
            
            // 현재 활성화된 도면이 몇 층인지 감싸고 있는 부모 div의 ID에서 숫자(1~4)만 추출
            var floorWrap = this.closest('.floor-map-wrap');
            var floorNum = 1;
            if (floorWrap) {
                // 'map-floor-2' 문자열에서 숫자인 '2'만 쏙 뽑아냅니다.
                floorNum = parseInt(floorWrap.id.replace('map-floor-', '')) || 1;
            }

            // 리스트 클릭 시 작동하던 기존 함수를 역으로 호출하여 우측 리스트 메뉴도 동시에 펼쳐지게 연동
            highlightRoom(roomId, floorNum);
        });
    });
});
