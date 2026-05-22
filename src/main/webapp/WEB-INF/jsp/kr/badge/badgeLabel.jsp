<%@ page contentType="text/html;charset=UTF-8" %>
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
            border: 1px solid #ccc;
        }
        .badge-header {
            background: #0055A4;
            color: white;
            text-align: center;
            font-size: 9pt;
            font-weight: bold;
            padding: 3.5mm 3mm;
            word-break: keep-all;
            line-height: 1.3;
        }
        .badge-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2mm 3mm;
            gap: 1.5mm;
        }
        .badge-period {
            font-size: 7pt;
            color: #555;
        }
        .badge-name {
            font-size: 20pt;
            font-weight: bold;
            letter-spacing: 3px;
        }
        .badge-footer {
            border-top: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2mm;
        }
        .badge-footer img {
            height: 7mm;
        }
    </style>
</head>
<body>
    <div class="badge-header">${data.EDU_NAME}</div>
    <div class="badge-body">
        <div class="badge-period">${data.START_DATE} ~ ${data.END_DATE}</div>
        <div class="badge-name">${data.STUDENT_NAME}</div>
    </div>
    <div class="badge-footer">
        <img src="http://localhost:8080/images/logo.gif" alt="산업안전보건공단">
    </div>
</body>
</html>