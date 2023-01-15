import { useEffect, useState } from "react"
import getSports from "../services/sportService"
import getAllUsers from "../services/userService"

const Match = (props) => {
    const { setTimedMessage } = props
    const [players, setPlayers] = useState([])
    const [sport, setSport] = useState([])

    return (
        <div id="matchdiv">
        <PreMatch setTimedMessage={setTimedMessage}
            setPlayers={setPlayers}
            players={players}
            setSport={setSport}/>
        <CurrentMatch setTimedMessage={setTimedMessage}
            players={players}
            sport={sport}/>
        </div>
    )
}

const CurrentMatch = (props) => {
    const { setTimedMessage, players, sport } = props
    const [rounds, setRounds] = useState([])

    const handleAddRound = () => {
        const newRound = {}
        players.forEach(player => {
            newRound[player] = 0
        })
        setRounds(rounds.concat(newRound))
    }

    const handleRemoveRound = () => {
        setRounds(rounds.slice(0,-1))
    }

    return (
        <div id="current-match">
            
            {
                rounds.map((round, index) => 
                    <div className="round" id={`round-${index+1}`} key={`round-${index+1}`}>
                        <h1>Round {index}</h1>
                        {
                            players.map((player, Playerindex) =>
                                <div className="round-players" key={`roundplayer-${index}-${Playerindex}`}>
                                    <input htmlFor={`roundplayer-${index}-${Playerindex}`} className="name-input" disabled value={player}></input>
                                    <input
                                        className="score-input"
                                        type="number"
                                        id={`roundplayer-${index}-${Playerindex}`}
                                        step="1"></input>
                                    <p>wins</p>
                                </div>   
                            )
                        }
                    </div>
                )
            }
            <br></br>
            <div id="round-buttons">
                <button className="match-button red-border round-button" onClick={handleRemoveRound}>Remove Round</button>
                <button className="match-button green-border round-button" onClick={handleAddRound}>Add Round</button>
            </div>
        </div>
    )
}

const PreMatch = (props) => {
    const { setTimedMessage, setPlayers, players, setSport } = props
    const [sports, setSports] = useState([])
    const [users, setUsers] = useState([])

    useEffect( () => {
        try {
            const allSports = async () => setSports(await getSports())
            const allUsers = async () => setUsers(await getAllUsers())
            allSports()
            allUsers()
        } catch (error) {
            setTimedMessage(error)
        }
    }, [])
    const handleAddPlayer = () => {
        setPlayers(players.concat(""))
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
                <select id="new-match-select" onChange={({target}) => handleSportChange(target.value)}>
                    {sports
                        ? sports.map(sport => 
                            <option key={sport._id}    
                            value={sport._id}>{sport.name}</option>)
                        : null
                    }
                </select>
            </div>
            <div>
                {
                players
                    ? players.map((player, index) =>
                        <div className="added-player" key={index}>
                            <label htmlFor={`player-${index}`}>{`Player ${index+1} `}</label>
                            <input 
                                className="player-input"
                                id={`player-${index}`} value={player}
                                onChange={({target}) => handlePlayerInput(target.value, index)}/>
                            <button className="match-button red-border" id={`remove-player-${index}`} 
                                onClick={() => handlePlayerRemove(index)}>Remove</button>
                        </div>)
                    : null
                }
            </div>
            <br></br>
            <button className="match-button green-border" id="add-player" onClick={handleAddPlayer}>Add Player</button>
        </div>
    )
}

export default Match