<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" href="/resources/css/cafeteria.css">

<div id="cafeteria-container">

    <div id="cafeteria-title">
        🍽️ 구내식당 안내
    </div>

    <!-- 운영시간 및 위치 -->
    <div id="cafeteria-info">
        <div class="info-item">
            <span class="info-label">📍 위치</span>
            <span class="info-value">본관 1층</span>
        </div>
        <div class="info-item">
            <span class="info-label">📞 문의</span>
            <span class="info-value">051-000-0000</span>
        </div>
    </div>

    <!-- 식단 테이블 -->
    <div id="meal-table">
        <table class="table table-bordered text-center">
            <thead class="table-dark">
                <tr>
                    <th>구분</th>
                    <th>운영시간</th>
                    <th>메뉴</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="item" items="${cafeteriaList}">
                    <tr>
                        <td>${item.MEAL_TYPE}</td>
                        <td>${item.MEAL_TIME}</td>
                        <td>${item.MENU}</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>

</div>

<script src="/resources/js/cafeteria.js"></script>