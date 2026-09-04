# JavaScript 모듈

## 모듈을 사용하는 이유

프로젝트가 커지면 데이터, 함수와 화면 코드를 한 파일에서 관리하기 어렵다. 모듈을 사용하면 파일을 역할별로 나누고 필요한 값만 다른 파일에 공개할 수 있다.

```text
games.js       → 게임 데이터
priceUtils.js  → 가격 관련 함수
main.js        → 필요한 값을 가져와 사용
```

```text
export → 파일 밖에서 사용할 수 있도록 공개
import → 다른 파일이 공개한 값을 가져오기
```

`export`는 함수를 실행하지 않는다. 함수 자체나 값을 다른 파일에서 사용할 수 있도록 공개할 뿐이다.

## 이름 있는 내보내기

한 파일에서 여러 값을 각각 이름으로 내보낼 때 적합하다.

`priceUtils.js`:

```javascript
export function calculateDiscountPrice(price, discountRate) {
    return price * (1 - discountRate / 100);
}

export function formatPrice(price) {
    return `${price.toLocaleString()}원`;
}
```

`main.js`:

```javascript
import {
    calculateDiscountPrice,
    formatPrice
} from "./priceUtils.js";

const discountedPrice = calculateDiscountPrice(64800, 20);
console.log(formatPrice(discountedPrice));
```

출력:

```text
51,840원
```

이름 있는 값을 가져올 때는 중괄호를 사용한다. 별칭이 필요하면 `as`를 사용할 수 있다.

```javascript
import { formatPrice as format } from "./priceUtils.js";
```

## 기본 내보내기

그 파일에서 주로 제공하는 값 하나를 내보낼 때 사용할 수 있다. 계산의 최종 결과라는 뜻이 아니라, 그 파일을 가져오는 주된 이유가 되는 함수·객체·컴포넌트를 뜻한다.

`GameCard.js`:

```javascript
function GameCard(game) {
    return `${game.name}: ${game.price}원`;
}

export default GameCard;
```

`main.js`:

```javascript
import GameCard from "./GameCard.js";

const game = {
    name: "Sekiro",
    price: 59800
};

console.log(GameCard(game));
```

기본 내보내기는 한 파일에서 하나만 가능하고 가져올 때 중괄호를 쓰지 않는다.

## 게임 데이터 분리

`games.js`:

```javascript
const games = [
    { id: 1, name: "Elden Ring", price: 64800 },
    { id: 2, name: "Minecraft", price: 30000 }
];

export default games;
```

`main.js`:

```javascript
import games from "./games.js";
import { formatPrice } from "./priceUtils.js";

console.log(games[0].name);
console.log(formatPrice(games[0].price));
```

## 핵심 비교

```text
이름 있는 export → 한 파일에서 여러 개 가능, import 시 { 이름 }
default export   → 한 파일에서 하나만 가능, import 시 중괄호 없음
```

## 자주 틀린 부분

```javascript
// priceUtils.js에는 default export가 없으므로 잘못된 import
import priceUtils from "./priceUtils.js";

// 이름 있는 export는 중괄호 사용
import { formatPrice } from "./priceUtils.js";

// games는 객체가 아니라 배열
console.log(games.name);    // undefined
console.log(games[0].name); // "Elden Ring"
```

## React에서 다시 만나는 위치

React에서는 컴포넌트, 게임 데이터와 보조 함수를 파일별로 분리할 때 `export`와 `import`를 계속 사용한다.

