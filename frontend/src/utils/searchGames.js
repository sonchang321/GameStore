export function searchGames(games, searchTerm){
    const normalizedSearchTerm = searchTerm.trim().toLowerCase()

    return games.filter((game) =>
        game.title.toLowerCase().includes(normalizedSearchTerm),
    )
}