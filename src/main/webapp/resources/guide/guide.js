// 호실별 Canvas 좌표 (단위: %, 이미지 기준) - 실제 도면 측정 후 보정 필요
var roomCoordsMap  = {
    incheon: {
        '101': { floor: 1, x: 14, y: 44, w: 14, h: 10 },
        '102': { floor: 1, x: 30, y: 44, w: 14, h: 10 },
        '103': { floor: 1, x: 46, y: 44, w: 14, h: 10 },
        '201': { floor: 2, x: 5,  y: 28, w: 22, h: 16 },
        '202': { floor: 2, x: 29, y: 28, w: 22, h: 16 },
        '203': { floor: 2, x: 5,  y: 52, w: 22, h: 16 },
        '204': { floor: 2, x: 29, y: 52, w: 22, h: 16 },
        '301': { floor: 3, x: 5,  y: 28, w: 22, h: 16 },
        '302': { floor: 3, x: 29, y: 28, w: 22, h: 16 },
        '303': { floor: 3, x: 53, y: 28, w: 22, h: 16 },
        '401': { floor: 4, x: 72, y: 58, w: 10, h: 16 },
        '402': { floor: 4, x: 60, y: 58, w: 10, h: 16 },
        '405': { floor: 4, x: 48, y: 58, w: 10, h: 16 }
    },
    ulsan: {
        '201': { floor: 2, x: 69, y:  5, w: 14, h:  5 },
        '202': { floor: 2, x: 83, y:  5, w: 14, h:  5 },
        '203': { floor: 2, x: 17, y: 73, w: 10, h: 12 },
        '204': { floor: 2, x:  2, y: 70, w: 11, h: 10 },

        '301': { floor: 3, x: 72, y: 15, w: 25, h:  8 },
        '302': { floor: 3, x: 73, y:  2, w: 16, h:  9 },
        '303': { floor: 3, points: [[36,25],[45,34],[56,24],[47,15]] },
        '304': { floor: 3, x: 17, y: 62, w:  9, h:  9 },
        '305': { floor: 3, x: 17, y: 72, w:  9, h: 12 },
        '306': { floor: 3, x: 17, y: 84, w:  9, h: 11 },

        '401': { floor: 4, points: [[20,21],[28,28],[33,23],[26,16]] },
        '402': { floor: 4, points: [[26,16],[34,23],[40,18],[32,11]] },
    }
};



function initGuideCanvas(roomName) {
    var roomCoords = roomCoordsMap[KIOSK_SITE] || roomCoordsMap['incheon'];
    var coord = roomCoords[roomName];

    if(!coord) {
        $('#classroom-map-area').hide();
        $('#classroom-map-fallback').show();
        return;
    }

    $('#classroom-map-fallback').hide();
    $('#classroom-map-area').show();

    var canvas = document.getElementById('classroom-canvas');
    if(!canvas) return;

    var img = new Image();
    img.onload = function() {
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        ctx.fillStyle   = 'rgba(255, 220, 0, 0.45)';
        ctx.strokeStyle = '#e00';
        ctx.lineWidth   = Math.max(2, canvas.width * 0.003);

        if(coord.points) {
            // 대각선 방
            var pts = coord.points.map(function(p) {
                return {
                    x: (p[0] / 100) * canvas.width,
                    y: (p[1] / 100) * canvas.height
                };
            });
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            ctx.lineTo(pts[1].x, pts[1].y);
            ctx.lineTo(pts[2].x, pts[2].y);
            ctx.lineTo(pts[3].x, pts[3].y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            // 직사각형 방
            var x = (coord.x / 100) * canvas.width;
            var y = (coord.y / 100) * canvas.height;
            var w = (coord.w / 100) * canvas.width;
            var h = (coord.h / 100) * canvas.height;
            ctx.fillRect(x, y, w, h);
            ctx.strokeRect(x, y, w, h);
        }
    };

    img.onerror = function() {
        $('#classroom-map-area').hide();
        $('#classroom-map-fallback').show();
    };

    img.src = '/images/eduInfo/floor_' + coord.floor + 'f.png';
}