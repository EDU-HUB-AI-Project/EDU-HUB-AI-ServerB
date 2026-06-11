/**
 * 생년월일(YYMMDD) 입력 검증 — B-refer validator.js 동일 로직
 */
function canAppendBirth(current, digit) {
    var next = current + digit;
    var len = next.length;
    if (len > 6) return false;
    if (len <= 2) return true;
    if (len === 3) return digit === '0' || digit === '1';
    if (len === 4) {
        var m1 = next[2];
        var m2 = next[3];
        if (m1 === '0') return m2 >= '1' && m2 <= '9';
        if (m1 === '1') return m2 >= '0' && m2 <= '2';
        return false;
    }
    if (len === 5) return digit >= '0' && digit <= '3';
    if (len === 6) {
        var d1 = next[4];
        var d2 = next[5];
        if (d1 === '0') return d2 >= '1' && d2 <= '9';
        if (d1 === '1' || d1 === '2') return true;
        if (d1 === '3') return d2 === '0' || d2 === '1';
        return false;
    }
    return false;
}

function isValidBirth(d) {
    if (!/^[0-9]{6}$/.test(d)) return false;
    var yy = parseInt(d.substring(0, 2), 10);
    var mm = parseInt(d.substring(2, 4), 10);
    var dd = parseInt(d.substring(4, 6), 10);
    var date = new Date(2000 + yy, mm - 1, dd);
    return date.getFullYear() === 2000 + yy
        && date.getMonth() === mm - 1
        && date.getDate() === dd;
}
