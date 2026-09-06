import {useState} from 'react'
import GameCard from './components/GameCard.jsx'
import './App.css'

const games = [
    {
        id: 1,
        title: '엘든 링',
        price: 64800,
    },
    {
        id: 2,
        title: '스타듀 밸리',
        price: 16000,
    },
    {
        id: 3,
        title: '사이버펑크 2077',
        price: 66000,
    },
]

function App() {
    const storeName = 'GameStore'
    const gameCount = games.length
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <header className="site-header">
                <strong className="site-logo">{storeName}</strong>
            </header>

            <main className="store">
                <h1 className="store-title">게임 목록</h1>
                <p className="game-summary" title="현재 판매 중인 게임 수">
                    판매 중인 게임은 {gameCount}개입니다.
                </p>
                <div className="search-area">
                    <label htmlFor="game-search">게임 검색</label>
                    <input
                        id="game-search"
                        type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <p>입력한 검색어: {searchTerm}</p>
                </div>
                <section className="game-list">
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            title={game.title}
                            price={game.price}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}

export default App