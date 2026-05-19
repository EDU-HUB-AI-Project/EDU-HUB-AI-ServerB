// 호실별 Canvas 좌표 (단위: %, 이미지 기준) - 실제 도면 측정 후 보정 필요
var roomCoords = {
    // 1층
    '101': { floor: 1, x: 14, y: 44, w: 14, h: 10 },
    '102': { floor: 1, x: 30, y: 44, w: 14, h: 10 },
    '103': { floor: 1, x: 46, y: 44, w: 14, h: 10 },
    // 2층
    '201': { floor: 2, x: 5,  y: 28, w: 22, h: 16 },
    '202': { floor: 2, x: 29, y: 28, w: 22, h: 16 },
    '203': { floor: 2, x: 5,  y: 52, w: 22, h: 16 },
    '204': { floor: 2, x: 29, y: 52, w: 22, h: 16 },
    // 3층
    '301': { floor: 3, x: 5,  y: 28, w: 22, h: 16 },
    '302': { floor: 3, x: 29, y: 28, w: 22, h: 16 },
    '303': { floor: 3, x: 53, y: 28, w: 22, h: 16 },
    // 4층
    '401': { floor: 4, x: 72, y: 58, w: 10, h: 16 },
    '402': { floor: 4, x: 60, y: 58, w: 10, h: 16 },
    '405': { floor: 4, x: 48, y: 58, w: 10, h: 16 }
};

function initGuideCanvas(roonName) {
    var coord = roomCoords[roonNAme];
    
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
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var x = (coord.x / 100) * canvas.width;
        var y = (coord.y / 100) * canvas.height;
        var w = (coord.w / 100) * canvas.width;
        var h = (coord.h / 100) * canvas.height;

        ctx.fillStyle = 'rgba(255, 220, 0, 0.45)';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#e00';
        ctx.lineWidth   = Math.max(2, canvas.width * 0.003);
        ctx.strokeRect(x, y, w, h);
    }
    img.src = '/images/floor_' + coord.floor + 'f.png';
}