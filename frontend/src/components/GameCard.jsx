import  { Link } from 'react-router'

function GameCard({id, title, price}) {
    return (
        <article className="game-card">
            <h2>
                <Link to={`/games/${id}`}>{title}</Link>
            </h2>
            <p>{price.toLocaleString()}원</p>
        </article>
    )
}

export default GameCard
