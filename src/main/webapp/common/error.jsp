<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>오류 안내</title>
<link rel="stylesheet" href="/resources/lib/bootstrap.min.css">
<link rel="stylesheet" href="/resources/common/common.css">
<script src="/resources/lib/jquery-4.0.0.min.js"></script>
<script src="/resources/lib/bootstrap.min.js"></script>
<style>
    body { background-color: #f8f9fa; }
    .error-wrap {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 24px;
    }
    .error-icon { font-size: 80px; }
    .error-title { font-size: 2rem; font-weight: bold; color: #343a40; }
    .error-msg { font-size: 1.2rem; color: #6c757d; line-height: 1.8; }
    .error-count { font-size: 1rem; color: #adb5bd; }
</style>
</head>
<body>
<div class="error-wrap">
    <div class="error-icon">⚠️</div>
    <div class="error-title">일시적인 오류가 발생했습니다</div>
    <div class="error-msg">
        잠시 후 다시 이용해 주세요.<br>
        문제가 계속되면 담당자에게 문의해 주세요.
    </div>
    <button class="btn btn-primary btn-lg px-5" onclick="location.href='/main.do'">
        홈으로 돌아가기
    </button>
    <div class="error-count" id="countdown">5초 후 자동으로 홈으로 이동합니다.</div>
</div>

<script>
    var count = 5;
    var timer = setInterval(function() {
        count--;
        if(count <= 0) {
            clearInterval(timer);
            location.href = '/main.do';
        } else {
            $('#countdown').text(count + '초 후 자동으로 홈으로 이동합니다.');
        }
    }, 1000);
</script>
</body>
</html>