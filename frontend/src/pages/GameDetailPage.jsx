import { Link, useParams } from 'react-router'
import games from '../data/games.js'
function GameDetailPage(){
    const { id } = useParams()
    const game = games.find((game) => game.id === Number(id))

    if(!game){
        return (
            <main className="store">
                <p>게임을 찾을 수 없습니다.</p>
                <Link to="/">게임 목록으로</Link>
            </main>
        )
    }

    return (
        <main className="store">
            <h1>{game.title}</h1>
            <p>{game.price.toLocaleString()}원</p>
            <Link to="/">게임 목록으로</Link>
        </main>
    )
}

export default GameDetailPage