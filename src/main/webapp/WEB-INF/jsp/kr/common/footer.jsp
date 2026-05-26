<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="footer">
    <span id="footer-time"></span>
    <span id="footer-copy">ⓒ 2026 HCNC. All rights reserved.</span>
</div>

<script>
    function updateFooterTime() {
        var now = new Date();
        var y = now.getFullYear();
        var mo = String(now.getMonth() + 1).padStart(2, '0');
        var d = String(now.getDate()).padStart(2, '0');
        var h = String(now.getHours()).padStart(2, '0');
        var mi = String(now.getMinutes()).padStart(2, '0');
        var s = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('footer-time').textContent =
            y + '.' + mo + '.' + d + ' ' + h + ':' + mi + ':' + s;
    }
    updateFooterTime();
    setInterval(updateFooterTime, 1000);
</script>