import { useEffect, useState } from 'react'
import getSports from '../services/sportService'
import getAllUsers from '../services/userService'
import {
  winListFromRound,
  sendMatch,
  validatePreMatch,
  validateScores,
} from '../services/matchService'
import { useNavigate } from 'react-router-dom'

const Match = (props) => {
  const { setTimedMessage, user } = props
  const [players, setPlayers] = useState([])
  const [sport, setSport] = useState([])
  const [matchOn, setMatchOn] = useState(false)
  const [users, setUsers] = useState([])
  const [sports, setSports] = useState([])
  const [scores, setScores] = useState([])

  try {
    useEffect(() => {
      const fetchUsers = async () => {
        const allUsers = await getAllUsers()
        setUsers(allUsers)
      }
      fetchUsers()
    }, [])
  } catch (error) {
    setTimedMessage(error.message, 5000)
  }

  return (
    <div id="matchdiv">
      <PreMatch
        setTimedMessage={setTimedMessage}
        setPlayers={setPlayers}
        players={players}
        setSport={setSport}
        matchOn={matchOn}
        users={users}
        sports={sports}
        setSports={setSports}
      />
      <CurrentMatch
        setTimedMessage={setTimedMessage}
        players={players}
        sport={sport}
        matchOn={matchOn}
        setMatchOn={setMatchOn}
        users={users}
        sports={sports}
        scores={scores}
        setScores={setScores}
        user={user}
      />
    </div>
  )
}

const CurrentMatch = (props) => {
  const {
    setTimedMessage,
    players,
    matchOn,
    setMatchOn,
    users,
    scores,
    setScores,
    sport,
    user,
  } = props
  const [wins, setWins] = useState([])
  const navigate = useNavigate()

  const handleAddRound = () => {
    const newRound = {}
    players.forEach((player) => {
      newRound[player] = 0
    })
    setScores([...scores, players.map((p) => 0)])
    setWins([...wins, players.map((p) => 0)])
  }

  const handleRemoveRound = () => {
    if (scores.length === 0) {
      setMatchOn(false)
    } else {
      const copyScores = [...scores]
      copyScores.pop()
      setScores(copyScores)
      setWins(wins.slice(0, wins.length - 1))
    }
  }

  const handleStartMatch = () => {
    try {
      validatePreMatch(players, users, user)
      setMatchOn(true)
    } catch (error) {
      setTimedMessage(error.message, 5000)
    }
  }

  const handleScoreChange = (inputField) => {
    let value = 0
    if (inputField.value) {
      value = Number(inputField.value)
    }
    const roundIndex = Number(inputField.id.split('-')[1])
    const playerId = Number(inputField.id.split('-')[2])
    const copyScores = [...scores]
    copyScores[roundIndex][playerId] = value
    setScores(copyScores)
    updateWins(roundIndex)
  }

  const updateWins = (startingRoundIndex) => {
    const newWins = winListFromRound(scores, startingRoundIndex, players, wins)
    setWins(newWins)

    for (
      let roundIndex = startingRoundIndex;
      roundIndex < wins.length;
      roundIndex++
    ) {
      for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
        const winInput = document.getElementById(
          `wins-${roundIndex}-${playerIndex}`
        )
        winInput.value = wins[roundIndex][playerIndex]
      }
    }
  }

  const sendMatchToServer = async (target) => {
    // validointi
    target.disabled = true
    setTimeout(() => {
      target.disabled = false
    }, 5000)
    try {
      validatePreMatch(players, users, user)
      validateScores(scores)
      const res = await sendMatch(players, users, scores, sport, user)
      setTimedMessage('Match saved!', 5000)
      navigate('/')
    } catch (error) {
      try {
        setTimedMessage(error.response.data.error, 5000)
      } catch (error2) {
        setTimedMessage(error.message, 5000)
      }
    }
  }

  return (
    <div id="current-match">
      {scores.map((round, index) => (
        <div
          className="round"
          id={`round-${index + 1}`}
          key={`round-${index + 1}`}
        >
          <h1>Round {index + 1}</h1>
          {players.map((player, Playerindex) => (
            <div
              className="round-players"
              key={`roundplayer-${index}-${Playerindex}`}
            >
              <input
                htmlFor={`roundplayer-${index}-${Playerindex}`}
                className="name-input"
                disabled
                value={player}
              ></input>
              <input
                className="score-input"
                type="number"
                id={`roundplayer-${index}-${Playerindex}`}
                step="1"
                onChange={({ target }) => handleScoreChange(target)}
              ></input>
              <input
                className="win-input"
                key={`wins-${index}-${Playerindex}`}
                id={`wins-${index}-${Playerindex}`}
                type="number"
                step="1"
                defaultValue={0}
                disabled
              ></input>
            </div>
          ))}
        </div>
      ))}
      <br></br>
      {matchOn ? (
        <>
          <div id="round-buttons">
            <button
              className="red-border round-button"
              onClick={handleRemoveRound}
            >
              {scores.length > 0 ? 'Remove Round' : 'Make Changes'}
            </button>
            <button
              className="green-border round-button"
              onClick={handleAddRound}
            >
              Add Round
            </button>
          </div>
          <div className="match-buttons">
            <button
              id="save-match-button"
              className="match-button green-border round-button"
              onClick={({ target }) => sendMatchToServer(target)}
            >
              Save Match
            </button>
          </div>
        </>
      ) : (
        <button
          id="start-match"
          className="match-button green-border "
          onClick={handleStartMatch}
        >
          Start Match!
        </button>
      )}
    </div>
  )
}

const PreMatch = (props) => {
  const {
    setTimedMessage,
    setPlayers,
    players,
    setSport,
    matchOn,
    users,
    sports,
    setSports,
    sport,
  } = props

  try {
    useEffect(() => {
      const allSports = async () => {
        const all = await getSports()
        setSports(all)
        setSport(all[0]._id)
      }
      allSports()
    }, [setSports])
  } catch (error) {
    setTimedMessage(error)
  }

  const handleAddPlayer = () => {
    setPlayers(players.concat(''))
  }

  const handlePlayerInput = (value, index) => {
    const newPlayers = [...players]
    newPlayers[index] = value
    setPlayers(newPlayers)
  }

  const handlePlayerRemove = (index) => {
    const newPlayers = players.filter((player, i) => i !== index)
    setPlayers(newPlayers)
  }

  const handleSportChange = (value) => {
    setSport(value)
  }

  return (
    <div>
      <div>
        <label htmlFor="new-match-select">Choose Sport</label>
        <select
          defaultValue={sport}
          id="new-match-select"
          onChange={({ target }) => handleSportChange(target.value)}
          disabled={matchOn}
        >
          {sports
            ? sports.map((sport) => (
                <option key={sport._id} value={sport._id}>
                  {sport.name}
                </option>
              ))
            : null}
        </select>
      </div>
      <div>
        <datalist id="playerdatalist">
          {users
            ? users.map((u) => (
                <option key={u.username} value={u.username}></option>
              ))
            : null}
        </datalist>
        {players
          ? players.map((player, index) => (
              <div className="added-player" key={index}>
                <label htmlFor={`player-${index}`}>{`Player ${
                  index + 1
                } `}</label>
                <input
                  className="player-input"
                  id={`player-${index}`}
                  value={player}
                  autoComplete="off"
                  onChange={({ target }) =>
                    handlePlayerInput(target.value, index)
                  }
                  list="playerdatalist"
                  disabled={matchOn}
                />
                <button
                  className="match-button red-border"
                  id={`remove-player-${index}`}
                  onClick={() => handlePlayerRemove(index)}
                  disabled={matchOn}
                >
                  Remove
                </button>
              </div>
            ))
          : null}
      </div>
      <br></br>
      <button
        className="match-button green-border"
        id="add-player"
        onClick={handleAddPlayer}
        disabled={matchOn}
      >
        Add Player
      </button>
    </div>
  )
}

export default Match
