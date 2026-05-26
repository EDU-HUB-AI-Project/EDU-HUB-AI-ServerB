# 🏫 스마트 EDU-HUB AI 키오스크
> 교육생 스스로 명찰을 발급하고, 시설·교통 정보를 안내하는 비대면 키오스크 시스템



## 📌 프로젝트 개요
| 항목 | 내용 |
|---|---|
| 사업명 | 스마트 EDU-HUB AI 키오스크 개발 Project |
| 대상 | 한국산업안전보건교육원 교육생 |
| 해상도 | 1080 × 1920px 세로형 터치 키오스크 |
| 역할 | External 서버 (프론트엔드 + API 프록시) |
| 포트 | 8080 |


### 목적

1. 교육생 스스로 명찰을 발급하는 **비대면 프로세스** 구축
2. 실시간 출석 및 생활관 배정 현황 관리 **자동화**
3. 교육장 내 주요 시설 및 교통 정보 제공을 통한 **편의성 증대**



---



## 🏗️ 시스템 아키텍처

[ 키오스크 화면 ]

↕ HTTP

[ External Server : 8080 ] ← 현재 프로젝트

↕ REST API

[ Internal Server : 8081 ] ← DB 처리 서버

↕

[ MariaDB ]



- **External (현재 프로젝트)** — JSP 렌더링, Internal API 호출, BIS API 연동

- **Internal** — DB 직접 접근, 비즈니스 로직, 트랜잭션 처리

- **DB 직접 접근 없음** — 모든 데이터는 Internal API 경유

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | eGovFramework 3.10.0 + Spring MVC 4.3.25 |
| 언어 | Java 1.8 |
| 빌드 | Maven / WAR 배포 |
| 뷰 | JSP, jQuery, Vanilla JS |
| 외부 API | 카카오맵 API, 울산 BIS API |
| UI | Bootstrap 5 (최소화), 커스텀 CSS |

---

## ✅ 구현 현황

### 버튼 1 — 명찰 발급 및 개인 맞춤 안내

| 기능 | 상태 |
|---|---|
| 숫자 키패드 생년월일 입력 | ✅ |
| 교육생 목록 조회 및 동명이인 처리 | ✅ |
| 라벨 프린터 명찰 출력 | 🔶 `window.print()` — 프린터 확정 후 교체 예정 |
| 출석 상태값 Y 자동 변경 | ✅ |
| 생활관 배정 인원 실시간 반영 | ✅ |
| 출력 완료 후 강의실·생활관 안내 화면 | ✅ |

### 버튼 2 — 시설 및 교통 정보 안내

| 기능 | 상태 |
|---|---|
| 구내식당 메뉴 및 운영시간 | ✅ |
| 흡연장소 위치 안내 | ✅ |
| 강의실 배치도 | ✅ |
| 카카오맵 위치 표시 | ✅ |
| 교통정보 — 울산 BIS API 실시간 버스 도착 | ✅ (4개 도착지) |
| 출발지별 경로 텍스트 안내 | ✅ |

---

## ⚙️ 환경 설정

### 사전 요구사항

- **Internal 서버(8081)가 먼저 기동**되어 있어야 합니다

- JDK 1.8 / Maven 3.x

### `globals.properties` 필수 설정

```properties

# Internal API

Globals.ApiClient=http://localhost:8081/

# 카카오맵 API 키 (도메인 제한 설정 필수)

kakao.map.key=YOUR_KAKAO_KEY

# 울산 BIS API

Bis.ServiceKey=YOUR_BIS_KEY

Bis.BaseUrl=http://openapi.its.ulsan.kr/UlsanAPI/

# BIS 정류장 설정

Bis.station.StopIds=192011415

Bis.terminal.StopIds=192011415|192011414

Bis.taehwa.StopIds=192011414|192011415

Bis.airport.StopIds=192011414

# 프린트 시킬 URL

Badge.PrintServerUrl=http://localhost:8080

# X-Api_Secret

Globals.ApiSecretKey=YOUR_SECRET_KEY
```

## 빌드 및 실행

mvn clean package
> WAR 파일을 Tomcat에 배포


## 📁 프로젝트 구조
```bash
src/main/java/kr/hcnc/

├── web/          # Controller (MainController, BadgeController, FacilityController)

├── service/      # Service (BadgeService, FacilityService, BisApiService)

├── util/         # ApiClient — Internal 서버 RestTemplate 래퍼

├── validator/    # 입력값 검증

└── filter/       # XSS 필터

src/main/webapp/WEB-INF/jsp/kr/

├── main/         # 메인 (인트로 화면)

├── badge/        # 명찰 발급 + 개인 안내

├── guide/        # 강의실·생활관 안내

└── facility/     # 시설 정보 (식당·흡연·강의실·교통)
```

## 🌿 브랜치 전략
``` bash
main        ← 보호 브랜치, PR + 리뷰 필수

└── develop ← 통합 브랜치

         ├── feature/작업명

         ├── fix/작업명

         └── style/작업명
```

## 📋 잔여 개발 항목

| 항목 | 비고 |
| ---- | ---- |
| 라벨 프린터 실제 연동 | 하드웨어 확정 후 |

	

