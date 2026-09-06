function GameCard({title, price}) {
    return (
        <article className="game-card">
            <h2>{title}</h2>
            <p>{price.toLocaleString()}원</p>
        </article>
    )
}

export default GameCard
