

export const validatePreMatch = (players, users) => {
    if (players.length <= 1) {
        throw Error("Choose at least 2 players")
    }
    const usernames = users.map(u => u.username)
    const foundUsernames = []
    for (const player of players) {
        if (!usernames.includes(player)) {
            throw Error(`username ${player} does not exist`)
        }
        if (foundUsernames.includes(player)) {
            throw Error(`duplicate username: ${player}`)
        }
        foundUsernames.push(player)
    }
    return true
}
