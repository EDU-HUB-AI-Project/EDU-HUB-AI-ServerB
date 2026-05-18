<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>메인페이지</title>
<script src = "resources/js/jquery-4.0.0.min.js"></script>
<script src = "resources/js/bootstrap.min.js"></script>
<script src="/resources/js/classroom.js"></script>
<link rel = "stylesheet" href = "resources/css/bootstrap.min.css">
</head>
<body>	
	<%@ include file = "/WEB-INF/jsp/kr/common/header.jsp" %>
	
	<div id = "button-area">
		<button type = "button" onclick="loadPage('/badge.do')" >
			명찰 발급 및 개인 맞춤 안내
		</button>
		
		<button type = "button" onclick="loadPage('/facility.do')" >
			보편적 시설 및 정보 안내
		</button>
	</div>
	
	<div id = "content-area">
	</div>


	<%@ include file = "/WEB-INF/jsp/kr/common/footer.jsp" %>
	
	<script>
		function loadPage(url) {
			$('#content-area').load(url);
		}
	</script>
</body>
</html>