# React 정적 화면

## React 프로젝트 구조

GameStore의 프론트엔드는 Vite로 생성한 React 프로젝트다.

```text
frontend/
├─ public/              그대로 제공되는 정적 파일
├─ src/
│  ├─ components/      재사용 컴포넌트
│  ├─ App.jsx          화면 구성
│  ├─ App.css          GameStore 화면 스타일
│  ├─ index.css        전체 페이지 기본 스타일
│  └─ main.jsx         React 시작점
├─ index.html          브라우저가 처음 읽는 HTML
└─ package.json        패키지와 실행 명령
```

개발 서버는 `frontend` 폴더에서 실행한다.

```powershell
npm run dev
```

## main.jsx와 App.jsx

`main.jsx`는 HTML의 `root` 요소에 React를 연결하고 `App` 컴포넌트를 렌더링한다.

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

`App.jsx`는 실제 화면에 표시할 JSX를 반환한다.

```jsx
function App() {
  return <h1>GameStore</h1>
}
```

## JSX

JSX는 JavaScript 안에서 화면 구조를 표현하는 문법이다. JSX 안에서 JavaScript 값이나 표현식을 사용할 때 중괄호를 쓴다.

```jsx
const gameCount = 3

return <p>판매 중인 게임은 {gameCount}개입니다.</p>
```

주요 규칙:

- 컴포넌트 이름은 대문자로 시작한다.
- 여러 최상위 요소는 하나의 부모 요소나 Fragment로 묶는다.
- HTML의 `class` 대신 `className`을 사용한다.
- JavaScript 표현식은 `{}` 안에 작성한다.

Fragment는 실제 HTML 태그를 추가하지 않고 여러 요소를 묶는다.

```jsx
<>
  <header>GameStore</header>
  <main>게임 목록</main>
</>
```

## 컴포넌트와 props

반복되는 화면은 별도 컴포넌트로 분리할 수 있다. 부모 컴포넌트는 props로 자식 컴포넌트에 값을 전달한다.

```jsx
<GameCard title="엘든 링" price={64800} />
```

자식은 props 객체를 구조 분해해 사용할 수 있다.

```jsx
function GameCard({ title, price }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{price.toLocaleString()}원</p>
    </article>
  )
}
```

문자열 리터럴은 따옴표로 전달하고 숫자나 JavaScript 표현식은 중괄호로 전달한다.

## 배열과 목록 렌더링

게임 데이터를 배열로 관리하고 `map()`으로 각 객체를 컴포넌트로 변환한다.

```jsx
{games.map((game) => (
  <GameCard
    key={game.id}
    title={game.title}
    price={game.price}
  />
))}
```

`key`는 React가 같은 목록의 각 항목을 식별하고 변경을 추적하는 데 사용한다. 배열 순서가 아니라 데이터의 안정적이고 고유한 ID를 사용하는 것이 좋다.

목록 개수는 직접 적지 않고 데이터에서 계산한다.

```jsx
const gameCount = games.length
```

## CSS와 반응형 레이아웃

`index.css`에는 전체 페이지의 기본 스타일을 두고 `App.css`에는 GameStore 화면 스타일을 둔다.

Header 내부 정렬에는 Flexbox를 사용했다.

```css
.site-header {
  display: flex;
  align-items: center;
}
```

게임 카드 목록에는 Grid를 사용했다.

```css
.game-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}
```

화면 폭이 800px 이하일 때는 한 열로 변경한다.

```css
@media (max-width: 800px) {
  .game-list {
    grid-template-columns: 1fr;
  }
}
```

공백 없이 긴 문자열이 카드 밖으로 넘치지 않도록 줄바꿈도 허용한다.

```css
.game-card h2 {
  overflow-wrap: anywhere;
}
```

## 확인 명령

```powershell
npm run lint
npm run build
```

- `npm run lint`: 코드 규칙과 잠재적인 실수를 검사한다.
- `npm run build`: 배포용 결과물을 정상적으로 만들 수 있는지 확인한다.

수동으로 넓은 화면의 3열, 좁은 화면의 1열, 긴 제목의 줄바꿈과 브라우저 Console 경고 여부를 확인했다.
