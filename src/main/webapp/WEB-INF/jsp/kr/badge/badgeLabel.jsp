<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: 85.6mm 54mm;
            margin: 0;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            width: 85.6mm;
            height: 54mm;
            font-family: 'Malgun Gothic', sans-serif;
            display: flex;
            flex-direction: column;
            background: #fff;
            overflow: hidden;
        }

        /* 상단 헤더 */
        .badge-header {
            background: linear-gradient(135deg, #003399, #0055cc);
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2mm 3mm;
            flex-shrink: 0;
        }

        .header-logo {
            height: 6mm;
        }

        .header-title {
            font-size: 7pt;
            font-weight: bold;
            letter-spacing: 0.5px;
            text-align: right;
            line-height: 1.4;
        }

        /* 교육과정명 */
        .badge-edu {
            background: #f0f4ff;
            text-align: center;
            font-size: 7pt;
            font-weight: bold;
            color: #003399;
            padding: 1.5mm 3mm;
            letter-spacing: 0.3px;
            border-bottom: 0.3mm solid #d0d8f0;
            word-break: keep-all;
            line-height: 1.3;
            flex-shrink: 0;
        }

        /* 이름 영역 */
        .badge-body {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1mm 4mm;
        }

        .badge-name {
            font-size: 22pt;
            font-weight: bold;
            color: #0a0a0a;
            letter-spacing: 6px;
            text-align: center;
        }

        /* 하단 정보 바 */
        .badge-footer {
            border-top: 0.3mm solid #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5mm 3mm;
            flex-shrink: 0;
            background: #fafafa;
        }

        .footer-item {
            font-size: 6pt;
            color: #555;
            line-height: 1.4;
        }

        .footer-item span {
            display: block;
            font-size: 7pt;
            color: #999;
            margin-bottom: 0.3mm;
        }

        .footer-item strong {
            font-size: 9pt;
            color: #222;
        }

        .footer-divider {
            width: 0.3mm;
            height: 6mm;
            background: #ddd;
        }
    </style>
</head>
<body>

    <div class="badge-header">
        <img class="header-logo" src="/images/logo.png" alt="로고">
    </div>

    <div class="badge-edu">${data.EDU_NAME}</div>

    <div class="badge-body">
        <div class="badge-name">${data.STUDENT_NAME}</div>
    </div>

    <div class="badge-footer">
        <div class="footer-item">
            <span>교육기간</span>
            <strong>
                <c:if test="${not empty data.START_DATE}">20${fn:substring(data.START_DATE, 0, 2)}.${fn:substring(data.START_DATE, 2, 4)}.${fn:substring(data.START_DATE, 4, 6)}</c:if>
                ~
                <c:if test="${not empty data.END_DATE}">20${fn:substring(data.END_DATE, 0, 2)}.${fn:substring(data.END_DATE, 2, 4)}.${fn:substring(data.END_DATE, 4, 6)}</c:if>
            </strong>
        </div>
        <div class="footer-divider"></div>
        <div class="footer-item" style="text-align: right;">
            <strong>
                <c:choose>
                    <c:when test="${empty data.subject}">미배정</c:when>
                    <c:when test="${fn:length(data.subject) == 1}">${data.subject[0].CLASSROOM_NAME}</c:when>
                    <c:otherwise>${data.subject[0].CLASSROOM_NAME} 외 ${fn:length(data.subject) - 1}</c:otherwise>
                </c:choose>
            </strong>
        </div>
    </div>

</body>
</html>