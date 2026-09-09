# React Router, 게임 상세와 검색 테스트

## URL과 화면 연결

`main.jsx`에서 `BrowserRouter`로 `App`을 감싸 하위 컴포넌트에서 라우팅 기능을 사용할 수 있게 했다. 이것만으로 주소별 화면이 생기지는 않는다. `App`의 `Routes`와 `Route`가 주소와 화면을 연결한다.

```jsx
<Routes>
  <Route path="/" element={<GameListPage />} />
  <Route path="/games/:id" element={<GameDetailPage />} />
  <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
</Routes>
```

- `path`: 화면을 표시할 경로 규칙
- `element`: 해당 경로에서 렌더링할 JSX
- `*`: 다른 경로에 일치하지 않는 주소 처리
- 공통 헤더는 `Routes` 바깥에 두어 각 페이지에서 표시한다.
- `pages` 폴더를 만드는 것만으로 주소가 등록되지는 않는다.

## 링크와 props

```jsx
<GameCard key={game.id} id={game.id} title={game.title} price={game.price} />
```

`key`는 React가 목록 항목을 식별하는 특별한 값이므로 카드에서 사용할 `id`는 별도 props로 전달한다.

```jsx
<Link to={`/games/${id}`}>{title}</Link>
```

`to`는 클릭할 때 이동할 목적지다. 템플릿 문자열로 ID를 주소에 넣는다. `/game/1`과 `/games/1`은 서로 다른 경로다. 실제로 링크에서 `s`를 빠뜨려 없는 페이지가 표시됐고, 등록된 경로와 일치하도록 수정했다.

## URL 매개변수와 게임 조회

```jsx
const { id } = useParams()
const game = games.find((game) => game.id === Number(id))
```

`/games/1`에서 `id`는 문자열 `'1'`이다. 데이터의 ID는 숫자이므로 `Number(id)`로 변환해 엄격하게 비교한다. `find()`는 첫 일치 객체를 반환하고, 없으면 `undefined`를 반환한다.

```jsx
if (!game) {
  return <p>게임을 찾을 수 없습니다.</p>
}
```

없는 게임을 먼저 처리해야 `game.title` 같은 접근에서 오류가 나지 않는다. `/games/999`는 주소 규칙에는 맞으므로 상세 페이지가 게임 존재 여부를 검사한다. `/hello`처럼 경로 자체가 없는 경우와 구분한다.

## 파일별 역할

| 파일 | 역할 |
|---|---|
| `App.jsx` | 공통 헤더와 라우트 |
| `pages/GameListPage.jsx` | 검색 상태와 목록 화면 |
| `pages/GameDetailPage.jsx` | ID 조회와 상세 화면, 없는 게임 처리 |
| `components/GameCard.jsx` | 제목·가격과 상세 링크 |
| `data/games.js` | 목록과 상세가 함께 사용하는 게임 배열 |
| `utils/searchGames.js` | 검색 결과 계산 |

검색 상태는 목록 페이지에 있으므로 상세로 이동했다가 돌아오면 초기화된다.

## 검색 순수 함수

```javascript
export function searchGames(games, searchTerm) {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  return games.filter((game) =>
    game.title.toLowerCase().includes(normalizedSearchTerm),
  )
}
```

페이지에서는 `searchGames(games, searchTerm)`으로 호출한다. 같은 입력에 같은 결과를 반환하고 원본 데이터를 변경하지 않는 순수 함수로 분리해 React 화면 없이 검사할 수 있게 했다.

## 자동 테스트

Node.js 내장 `node:test`와 `node:assert/strict`를 사용했다. 테스트는 준비 → 실행 → 검증 순서로 작성한다. `assert.deepEqual(실제값, 기대값)`은 배열과 객체의 내부 값까지 비교한다.

`src/utils/searchGames.test.js`에서 검사하는 다섯 가지:

1. 앞뒤 공백과 대소문자를 무시한 부분 검색
2. 빈 검색어에서 전체 목록 반환
3. 일치하는 게임이 없을 때 빈 배열 반환
4. 원본 목록이 비어 있을 때 빈 배열 반환
5. 검색 후 원본 배열과 객체 내용 유지

자동 테스트는 작성해둔 검사를 반복 실행하고 판정한다. 모든 입력이나 버그가 없음을 보장하지 않는다. 버그를 발견하면 재현 테스트를 추가해 같은 문제가 다시 생기는지 검사할 수 있다. 기존 동작이 깨지지 않았는지 확인하는 검사를 회귀 테스트라고 한다.

## 실행과 검증

IntelliJ PowerShell 터미널에서 `frontend` 폴더로 이동한 후 실행한다.

```powershell
node --test src/utils/searchGames.test.js
npm run lint
npm run build
npm run dev
```

- 테스트: 검색 동작과 원본 유지 검사
- lint: 코드 규칙과 잠재적인 실수 검사
- build: 배포용 파일 생성 가능 여부 확인
- dev: 브라우저 수동 확인용 개발 서버 실행

2026-09-09 학습 완료 시 코드 리뷰를 마쳤고, 사용자가 테스트 5개 통과, lint·build 성공을 보고했다. 최종 수동 확인은 검색 후 상세 이동, 목록 복귀와 검색 결과 없음·초기화, `/games/999`, `/hello`, Console 오류·경고 없음이다. 앞선 수업에서 정상 ID 1·2·3, 주소 직접 입력과 새로고침, 링크와 뒤로 가기도 확인했다.
