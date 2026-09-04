# Promise와 async/await

## 동기와 비동기

일반적인 동기 코드는 위에서 아래로 실행된다. 서버 요청처럼 시간이 걸리는 작업을 기다리는 동안 프로그램 전체를 멈추지 않고 다음 작업을 진행하는 흐름을 비동기 처리라고 한다.

```javascript
console.log("게임 요청");

setTimeout(() => {
    console.log("게임 도착");
}, 2000);

console.log("다른 작업");
```

출력 순서:

```text
게임 요청
다른 작업
게임 도착
```

`setTimeout()`은 콜백을 나중에 실행하도록 예약하고, JavaScript는 다음 동기 코드를 계속 실행한다.

## Promise의 상태

```text
pending   → 작업 중
fulfilled → 작업 성공
rejected  → 작업 실패
```

```javascript
const gamePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Minecraft");
    }, 1000);
});
```

```text
resolve(결과) → Promise 성공
reject(오류)  → Promise 실패
```

Promise 생성자에서 첫 번째 매개변수는 성공 함수이고 두 번째 매개변수는 실패 함수다. 매개변수의 이름이 아니라 순서가 역할을 결정한다.

```javascript
new Promise((resolve, reject) => {
    // resolve는 첫 번째, reject는 두 번째
});
```

## 성공, 실패와 마무리 처리

```javascript
gamePromise
    .then((gameName) => {
        console.log(`${gameName}를 불러왔습니다.`);
    })
    .catch((error) => {
        console.log(error.message);
    })
    .finally(() => {
        console.log("게임 요청 완료");
    });
```

```text
.then()    → 성공 결과 처리
.catch()   → 실패 오류 처리
.finally() → 성공·실패와 관계없이 마지막 처리
```

전달받은 결과를 사용하지 않고 값을 직접 작성하면 Promise 결과가 바뀌었을 때 코드가 대응하지 못한다.

```javascript
// 잘못된 예: gameName을 받았지만 사용하지 않음
.then((gameName) => {
    console.log("Minecraft를 불러왔습니다.");
});

// 올바른 예
.then((gameName) => {
    console.log(`${gameName}를 불러왔습니다.`);
});
```

## 성공과 실패를 반환하는 예제

```javascript
function fetchGames(isServerOnline) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isServerOnline) {
                resolve(["Elden Ring", "Minecraft"]);
            } else {
                reject(new Error("게임 서버 연결 실패"));
            }
        }, 1000);
    });
}
```

`fetchGames()`가 즉시 반환하는 값은 게임 배열이 아니라 Promise다. 배열은 Promise가 성공한 뒤 `.then()` 또는 `await`로 받는다.

```javascript
fetchGames(true)
    .then((games) => {
        console.log(games[0]);
    })
    .catch((error) => {
        console.log(error.message);
    });
```

이 예제의 `games`는 문자열 배열이므로 첫 번째 이름은 `games[0]`이다. 객체 배열일 때만 `games[0].name`을 사용한다.

## async/await

`async/await`는 Promise 흐름을 위에서 아래로 읽기 쉽게 작성하는 문법이다.

```javascript
async function loadGames() {
    const games = await fetchGames(true);
    console.log(games);
}
```

- `await`를 사용하는 함수에는 `async`가 필요하다.
- `await`는 Promise의 성공 또는 실패가 결정될 때까지 현재 `async` 함수 안의 다음 코드를 기다리게 한다.
- JavaScript 프로그램 전체를 멈추는 것은 아니다.

## try/catch/finally

`await`한 Promise가 실패할 수 있으므로 `try/catch`로 처리한다. 로딩 종료처럼 성공과 실패 모두에서 필요한 코드는 `finally`에 둔다.

```javascript
async function loadGames() {
    console.log("로딩 시작");

    try {
        const games = await fetchGames(true);
        console.log(games[0]);
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log("로딩 종료");
    }
}

loadGames();
```

성공 시 출력:

```text
로딩 시작
Elden Ring
로딩 종료
```

실패 시 출력:

```text
로딩 시작
게임 서버 연결 실패
로딩 종료
```

## 두 작성 방식의 대응 관계

```text
Promise 방식     async/await 방식
.then()       ↔ try 안의 await 다음 코드
.catch()      ↔ catch
.finally()    ↔ finally
```

## React에서 다시 만나는 위치

GameStore에서는 서버에서 게임 목록과 상세 정보를 불러올 때 비동기 처리를 사용한다. 화면은 최소한 다음 세 상태를 구분해야 한다.

```text
로딩 중
불러오기 성공
불러오기 실패
```

