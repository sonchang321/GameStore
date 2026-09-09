import {useState} from 'react'
import {searchGames} from "../utils/searchGames.js";
import GameCard from '../components/GameCard.jsx'
import games from '../data/games.js'

function GameListPage() {
    const gameCount = games.length
    const [searchTerm, setSearchTerm] = useState('')
    const filteredGames = searchGames(games, searchTerm)

    return (
        // 기존 <main> 전체
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
                <p>검색 결과: {filteredGames.length}개</p>
            </div>

            {filteredGames.length > 0 ? (
                <section className="game-list">
                    {filteredGames.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            title={game.title}
                            price={game.price}
                        />
                    ))}
                </section>
            ) : (
                <p className="empty-message">검색 결과가 없습니다.</p>
            )}
        </main>
    )
}

export default GameListPage