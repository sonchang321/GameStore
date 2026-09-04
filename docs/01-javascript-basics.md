# JavaScript 핵심 정리

이 문서는 GameStore를 만들기 위해 실제로 학습한 내용만 정리한다. 문법을 외우기보다 각 문법이 어떤 결과를 반환하는지 구분하는 것이 핵심이다.

## 예제 데이터

```javascript
const games = [
    { id: 1, name: "Elden Ring", price: 64800 },
    { id: 2, name: "Minecraft", price: 30000 },
    { id: 3, name: "Sekiro", price: 59800 }
];
```

## 객체와 배열 접근

```javascript
console.log(games[0]);      // 첫 번째 게임 객체
console.log(games[0].name); // "Elden Ring"
```

- 배열의 인덱스는 `0`부터 시작한다.
- `games[0]`은 객체 전체이고 `games[0].name`은 객체의 `name` 값이다.
- 객체 안에서는 `key: value`를 사용한다. `key = value`가 아니다.

## 배열 변경

```javascript
games.push({ id: 4, name: "Cyberpunk 2077", price: 66000 });
const removedGame = games.pop();
```

- `push()`는 배열 끝에 값을 추가하고 원본 배열을 변경한다.
- `pop()`은 마지막 값을 제거하고, 제거한 값을 반환한다.

## `map`, `filter`, `find`

### `map()`

각 요소를 가공해서 같은 길이의 새 배열을 만든다.

```javascript
const gameNames = games.map((game) => game.name);
// ["Elden Ring", "Minecraft", "Sekiro"]
```

### `filter()`

조건이 `true`인 요소들로 새 배열을 만든다. 결과가 0개나 1개여도 항상 배열이다.

```javascript
const expensiveGames = games.filter((game) => game.price >= 50000);
```

### `find()`

조건이 `true`인 첫 번째 요소 하나를 반환한다. 찾지 못하면 `undefined`를 반환한다.

```javascript
const foundGame = games.find((game) => game.id === 2);
```

### 메서드 체이닝

`filter()`가 새 배열을 반환하므로 그 결과에 바로 `map()`을 사용할 수 있다.

```javascript
const expensiveGameNames = games
    .filter((game) => game.price >= 50000)
    .map((game) => game.name);
```

## 문자열 검색

`includes()`는 문자열에 검색어가 포함되어 있는지 확인한다. 대소문자를 구분하므로 검색할 때는 양쪽을 같은 형태로 바꾼다.

```javascript
const keyword = "CRAFT";

const searchedGame = games.find((game) =>
    game.name.toLowerCase().includes(keyword.toLowerCase())
);
```

검색어만 소문자로 바꾸면 충분하지 않다.

```javascript
// 잘못된 예: game.name은 원래 대소문자를 유지한다.
game.name.includes(keyword.toLowerCase());
```

## 전개 문법

### 객체 복사와 변경

```javascript
const game = {
    id: 2,
    name: "Minecraft",
    price: 30000,
    isDiscounted: false
};

const discountedGame = {
    ...game,
    isDiscounted: true
};
```

뒤에 작성한 같은 프로퍼티가 앞의 값을 덮어쓴다. 원본 `game`은 변경되지 않는다.

### 배열 복사와 추가

```javascript
const newGame = { id: 4, name: "Cyberpunk 2077", price: 66000 };
const updatedGames = [...games, newGame];
```

- 배열을 만들 때는 `[]`를 사용한다.
- `...games`는 기존 요소들을 펼친다.
- `newGame`은 객체 하나이므로 앞에 `...`를 붙이지 않는다.

### 배열의 특정 객체만 변경

```javascript
const updatedGames = games.map((game) =>
    game.id === 2
        ? { ...game, price: 35000 }
        : game
);
```

- 변경할 객체는 복사한 뒤 필요한 프로퍼티를 덮어쓴다.
- 변경하지 않을 객체는 `: game`으로 기존 값을 반환한다.
- `map()`은 모든 요소마다 결과를 하나씩 반환해야 한다.

## 구조 분해 할당

### 객체

```javascript
const { name, price } = game;
```

변수 이름을 바꾸거나 기본값을 지정할 수도 있다.

```javascript
const { name: gameName, stock = 10 } = game;
```

### 배열

배열은 변수 이름이 아니라 순서에 따라 값이 들어간다.

```javascript
const gameNames = ["Elden Ring", "Minecraft", "Sekiro"];
const [first, second, third] = gameNames;
```

필요한 값만 꺼내거나 앞의 위치를 건너뛸 수 있다.

```javascript
const [first, second] = gameNames;
const [, , third] = gameNames;
```

첫 값과 나머지를 분리할 수도 있다.

```javascript
const prices = [64800, 30000, 59800, 66000];
const [firstPrice, ...otherPrices] = prices;
```

### 함수 매개변수

함수의 매개변수 자리에서 객체를 바로 구조 분해할 수 있다.

```javascript
function printGameInfo({ name, isDiscounted }) {
    console.log(name);
    console.log(isDiscounted);
}

printGameInfo({
    name: "Elden Ring",
    isDiscounted: true
});
```

React 컴포넌트의 `props`에서도 같은 형태를 자주 사용한다.

## 자주 틀린 부분

```javascript
// 엄격한 비교
game.id === 2;

// 객체의 프로퍼티
{ price: 35000 };

// 값 대입
game.price = 35000;

// 객체를 담은 새 배열
const updatedGames = [...games, newGame];

// 객체를 복사하면서 값 변경
const updatedGame = { ...game, price: 35000 };
```

`:`은 객체의 프로퍼티를 작성할 때, `=`은 변수나 프로퍼티에 값을 대입할 때, `===`는 두 값을 비교할 때 사용한다.

## React에서 다시 만나는 위치

```text
map()       → 게임 카드 목록 출력
filter()    → 이름 검색과 조건 필터
find()      → ID로 게임 하나 찾기
전개 문법   → 상태를 직접 변경하지 않고 새 객체·배열 생성
구조 분해   → 컴포넌트가 받은 props에서 값 꺼내기
```
