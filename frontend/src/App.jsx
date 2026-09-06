function App() {
    const storeName = 'GameStore'
    const gameCount = 3

    return (
        <>
            <header>
                <strong>{storeName}</strong>
            </header>

            <main className="store">
                <h1 className="store-title">게임 목록</h1>
                <p title="현재 판매 중인 게임 수">
                    판매 중인 게임은 {gameCount}개입니다.
                </p>
                <button type="button" disabled={gameCount === 0}>
                    게임 보기
                </button>
            </main>
        </>
    )
}

export default App