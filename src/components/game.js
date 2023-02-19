import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGameById } from '../services/gameService'

const Game = (props) => {
  const { id } = useParams()
  const [game, setGame] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getGame = async () => {
      const res = await getGameById(id)
      setGame(res)
    }
    getGame()
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading</div>
  }

  if (!game) {
    return <div>Game not found</div>
  }

  return (
    <div id="game-view">
      <div>
        <span>date: </span>
        <span>
          {`${new Date(game.date).toLocaleDateString('fi-FI')} ${new Date(
            game.date
          ).toLocaleTimeString('fi-FI')}`}
        </span>
      </div>
      <div>
        <span>players: </span>
        <span>{game.players.map((p) => p.username).join(', ')}</span>
      </div>
      <div>
        <span>winners: </span>
        <span>{game.winners.map((p) => p.username).join(', ')}</span>
      </div>
      <div id="game-rounds">
        <span>rounds: </span>
        <span>
          <ul>
            {game.rounds.map((r, i) => (
              <li key={`${r}-${i}`}>
                <h3 className="game-round-header">Round {i + 1}</h3>
                <ul>
                  {r.map((score, index) => (
                    <li
                      key={`score-${i}-${index}`}
                      className="game-round-scores"
                    >
                      <span>{game.players[index].username}: </span>
                      <span>{score}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  )
}

export default Game
