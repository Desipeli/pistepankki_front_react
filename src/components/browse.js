import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll } from '../services/gameService'
import getSports from '../services/sportService'
import getAllUsers from '../services/userService'

const BrowseGames = (props) => {
  const { setTimedMessage } = props
  const [sports, setSports] = useState([])
  const [sport, setSport] = useState('')
  const [users, setUsers] = useState([])
  const [winners, setWinners] = useState([])

  useEffect(() => {
    const getAllSports = async () => {
      const res = await getSports()
      const all = { _id: '', name: 'all' }
      setSports([all, ...res])
      setSport(all._id)
    }
    const getUsers = async () => {
      const res = await getAllUsers()
      setUsers(res)
    }
    try {
      getAllSports()
      getUsers()
    } catch (error) {
      setTimedMessage(error.message, 5000)
    }
  }, [])
  const handleSportChange = (value) => {
    setSport(value)
  }

  const updateWinnerFields = () => {
    const winnerInputs = document.getElementsByClassName('search-winners-input')
    const values = Array.from(winnerInputs).map((i) => i.value)
    setWinners(values)
  }

  const handleSearchButton = () => {
    updateWinnerFields()
  }

  return (
    <div id="browse-view">
      <div id="search-options">
        <div id="search-sport">
          <label htmlFor="search-sport-select">sport</label>

          {sports ? (
            <select
              id="search-sport-select"
              defaultValue={sport}
              onChange={({ target }) => handleSportChange(target.value)}
            >
              {sports.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div id="search-winners">
          <label htmlFor="search-winners-inputs">Winners</label>
          <div id="search-winners-inputs">
            <ul>
              {winners
                ? winners.map((w, i) => (
                    <li key={`${w}-${i}`}>
                      <input
                        defaultValue={w}
                        className="search-winners-input"
                      ></input>
                    </li>
                  ))
                : null}
            </ul>
            <div id="search-winners-buttons">
              <button onClick={() => setWinners(winners.slice(0, -1))}>
                -
              </button>
              <button onClick={() => setWinners([...winners, ''])}>+</button>
            </div>
          </div>
          <button
            id="search-button"
            className="green-border"
            onClick={handleSearchButton}
          >
            Search
          </button>
        </div>
      </div>
      <GameList
        setTimedMessage={setTimedMessage}
        sport={sport}
        winners={winners}
      />
    </div>
  )
}

const GameList = (props) => {
  const { setTimedMessage, sport, winners } = props
  const [games, setGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])

  useEffect(() => {
    const getGames = async () => {
      const res = await getAll()
      setGames(res)
    }
    try {
      getGames()
    } catch (error) {
      setTimedMessage(error.message, 5000)
    }
  }, [])

  useEffect(() => {
    // Filters
    if (!games) return
    let fg = [...games]
    if (sport) {
      fg = fg.filter((g) => g.sport._id === sport)
    }
    if (winners.length > 0) {
      const wg = [...fg]
      fg = []
      for (const game of wg) {
        let foundInvalid = false
        for (const winner of game.winners) {
          if (!winners.includes(winner.username)) {
            foundInvalid = true
            break
          }
        }
        if (!foundInvalid) {
          fg.push(game)
        }
      }
    }

    setFilteredGames(fg)
  }, [games, sport, winners])

  return (
    <div>
      <ul>
        {filteredGames
          ? filteredGames
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((g) => (
                <Link key={g._id} to={`/game/${g._id}`}>
                  <li className="listed-game" key={g._id}>
                    <span name="sport">{`${g.sport.name}`}</span>
                    <span name="datetime">
                      {`${new Date(g.date).toLocaleDateString('fi-FI')} `}
                    </span>
                  </li>
                </Link>
              ))
          : null}
      </ul>
    </div>
  )
}

export default BrowseGames
