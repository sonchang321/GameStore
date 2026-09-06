import GameCard from './components/GameCard.jsx'

function App() {
    const storeName = 'GameStore'
    const gameCount = 2

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
                <section className="game-list">
                    <GameCard title="엘든 링" price={64800}/>
                    <GameCard title="스타듀 밸리" price={16000}/>
                </section>
            </main>
        </>
    )
}

export default App