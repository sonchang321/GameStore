# 웹 개발 흐름과 도구

## GameStore의 전체 흐름

사용자가 게임 목록을 열었을 때 데이터는 다음 순서로 이동한다.

```text
브라우저
→ React가 게임 목록을 요청
→ Spring Boot가 요청을 받음
→ DB에서 게임 데이터를 조회
→ Spring Boot가 JSON으로 응답
→ React가 JSON을 화면에 표시
```

반대 방향으로 보면 응답 흐름은 다음과 같다.

```text
DB
→ Spring Boot
→ JSON 응답
→ React
→ 브라우저 화면
```

## 각 구성요소의 역할

### 브라우저

- 사용자가 실제로 보는 화면을 표시한다.
- 클릭과 입력 같은 사용자 동작이 발생한다.
- React가 만든 HTML, CSS와 JavaScript를 실행한다.

### React

- 게임 카드, 검색창과 상세 화면을 만든다.
- 사용자의 입력과 화면 상태를 관리한다.
- Spring Boot API에 데이터를 요청한다.
- 응답받은 JSON을 화면에 표시한다.

### Spring Boot

- React의 HTTP 요청을 받는다.
- 필요한 업무 규칙을 처리한다.
- DB에 데이터를 저장하거나 조회한다.
- 처리 결과를 JSON과 적절한 HTTP 상태 코드로 반환한다.

### 데이터베이스

- 게임 이름, 가격과 ID 같은 데이터를 영구 저장한다.
- Spring Boot의 요청에 따라 데이터를 조회하거나 변경한다.
- 브라우저나 React가 DB에 직접 접근하지 않는다.

## HTTP와 JSON

HTTP는 브라우저와 서버가 요청과 응답을 주고받는 규칙이다.

```text
GET /api/games
```

위 요청은 게임 목록을 달라는 의미로 사용할 수 있다. 서버는 다음과 같은 JSON을 응답할 수 있다.

```json
[
    {
        "id": 1,
        "name": "Elden Ring",
        "price": 64800
    },
    {
        "id": 2,
        "name": "Minecraft",
        "price": 30000
    }
]
```

JSON은 서로 다른 프로그램이 데이터를 주고받기 위한 문자열 형식이다. JavaScript 객체와 모양이 비슷하지만, JSON의 프로퍼티 이름과 문자열은 큰따옴표를 사용한다.

## 개발 도구의 역할

```text
IntelliJ IDEA    → 코드를 작성하고 프로젝트를 실행하는 개발 환경
PowerShell       → 명령으로 폴더 이동, 실행과 상태 확인
Node.js          → 브라우저 밖에서 JavaScript와 개발 도구 실행
npm              → JavaScript 패키지 설치와 실행 명령 관리
Java/JDK         → Spring Boot 백엔드 코드 컴파일과 실행
Git              → 파일의 변경 이력 저장
GitHub           → Git 저장소를 원격으로 보관하고 공유
```

## 헷갈리지 말아야 할 점

- React는 DB에 직접 연결하지 않는다.
- Spring Boot는 화면을 그리는 주체가 아니라 API와 서버 로직을 담당한다.
- JSON은 DB가 아니라 데이터 표현 형식이다.
- Git은 변경 이력을 관리하는 도구이고 GitHub는 원격 저장소 서비스다.
- Node.js와 npm은 같은 것이 아니다. Node.js는 실행 환경이고 npm은 패키지 관리 도구다.

## 첫 번째 완성본의 목표

```text
게임 목록
게임 상세
이름 검색
```

첫 완성에서는 위 세 기능을 React, Spring Boot와 DB까지 연결한다. 장바구니, 로그인, 관리자와 주문 기능은 첫 완성 이후에 확장한다.

