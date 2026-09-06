# React 상태와 검색

## 이벤트와 상태

React의 `useState`는 컴포넌트가 값을 기억하게 하고, 상태 변경 함수를 호출했을 때 화면을 다시 렌더링한다.

```jsx
const [searchTerm, setSearchTerm] = useState('')
```

- `searchTerm`: 현재 검색어 상태
- `setSearchTerm`: 검색어 상태를 변경하는 함수
- `''`: 최초 렌더링에서 사용할 초기값

일반 변수의 변경은 React에 다시 렌더링할 시점을 알려주지 않는다. 화면에 반영되어야 하는 변경값은 상태로 관리하고 상태 변경 함수를 사용한다.

## 제어 입력

입력창의 값과 React state를 연결하면 React가 입력값의 기준이 된다.

```jsx
<input
  id="game-search"
  type="text"
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
/>
```

입력 흐름:

```text
사용자 입력
→ onChange 실행
→ event.target.value 확인
→ setSearchTerm 호출
→ 상태 변경
→ App 재렌더링
```

`label`의 `htmlFor`와 입력창의 `id`를 같게 지정하면 label을 클릭해도 입력창에 초점이 이동한다.

```jsx
<label htmlFor="game-search">게임 검색</label>
<input id="game-search" />
```

## 검색어 정규화

검색 전에 앞뒤 공백을 제거하고 영문을 소문자로 통일했다.

```jsx
const normalizedSearchTerm = searchTerm.trim().toLowerCase()
```

- `trim()`: 앞뒤 공백 제거
- `toLowerCase()`: 영문 대소문자 차이 제거

게임 제목에도 같은 소문자 변환을 적용해야 대소문자를 무시하고 비교할 수 있다.

## filter와 includes

`filter()`는 조건에 맞는 게임만 담은 새 배열을 만든다. `includes()`는 제목에 검색어가 포함됐는지 확인한다.

```jsx
const filteredGames = games.filter((game) =>
  game.title.toLowerCase().includes(normalizedSearchTerm),
)
```

화면에서는 원본 `games`가 아니라 검색 결과인 `filteredGames`를 렌더링한다.

```jsx
{filteredGames.map((game) => (
  <GameCard
    key={game.id}
    title={game.title}
    price={game.price}
  />
))}
```

## 원본 데이터와 파생 값

`filteredGames`는 별도 상태로 저장하지 않았다. 원본 `games`와 상태 `searchTerm`만 있으면 매 렌더링에서 계산할 수 있는 파생 값이기 때문이다.

```text
games + searchTerm → filteredGames
```

같은 의미의 값을 여러 상태로 중복 저장하면 서로 다른 값이 되어 동기화 오류가 생길 수 있다. 계산할 수 있는 값은 필요한 시점에 계산한다.

## 조건부 렌더링

검색 결과 유무에 따라 게임 목록과 안내 문구 중 하나를 표시한다.

```jsx
{filteredGames.length > 0 ? (
  <section className="game-list">
    {/* 검색된 GameCard 목록 */}
  </section>
) : (
  <p className="empty-message">검색 결과가 없습니다.</p>
)}
```

삼항 연산자의 구조:

```text
조건 ? 참일 때 표시할 JSX : 거짓일 때 표시할 JSX
```

검색 결과가 한 개 이상이면 목록을 표시하고, 0개이면 결과 없음 문구를 표시한다.

## 확인한 경우

- 빈 검색어에서 전체 게임 표시
- 일부 제목 검색
- 영문 대소문자를 바꾼 검색
- 검색어 앞뒤 공백 처리
- 일치하는 게임이 없는 경우
- 검색어를 지웠을 때 전체 목록 복구
- 브라우저 Console 오류 없음
- `npm run lint` 통과
- `npm run build` 통과
