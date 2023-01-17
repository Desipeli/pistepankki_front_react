import { useEffect, useState } from "react"
import getSports from "../services/sportService"
import getAllUsers from "../services/userService"
import { validatePreMatch } from "../services/matchService"

const Match = (props) => {
    const { setTimedMessage } = props
    const [players, setPlayers] = useState([])
    const [sport, setSport] = useState([])
    const [matchOn, setMatchOn] = useState(false)
    const [users, setUsers] = useState([])
    const [sports, setSports] = useState([])

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const allUsers = await getAllUsers()
                setUsers(allUsers)
            } catch (error) {
                setTimedMessage(error.message, 5000)
            }
        }
        fetchUsers()
    },[])

    return (
        <div id="matchdiv">
        <PreMatch setTimedMessage={setTimedMessage}
            setPlayers={setPlayers}
            players={players}
            setSport={setSport}
            matchOn={matchOn}
            users={users}
            sports={sports}
            setSports={setSports}/>
        <CurrentMatch setTimedMessage={setTimedMessage}
            players={players}
            sport={sport}
            matchOn={matchOn}
            setMatchOn={setMatchOn}
            users={users}
            sports={sports}/>
        </div>
    )
}

const CurrentMatch = (props) => {
    const { setTimedMessage, players, matchOn, setMatchOn, users} = props
    const [rounds, setRounds] = useState([])

    const handleAddRound = () => {
        const newRound = {}
        players.forEach(player => {
            newRound[player] = 0
        })
        setRounds(rounds.concat(newRound))
        const content = document.getElementById('content')
        const rndbtns = document.getElementById('round-buttons')
        if (content.scrollHeight > window.innerHeight) {
            rndbtns.scrollIntoView()
        }
    }

    const handleRemoveRound = () => {
        if (rounds.length === 0) {
            setMatchOn(false)
        } else {
            setRounds(rounds.slice(0,-1))
        }
    }

    const handleStartMatch = () => {
        try {
            validatePreMatch(players, users)
            setMatchOn(true)
        } catch (error) {
            setTimedMessage(error.message, 5000)
        }
        
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
            {matchOn
                ?  <div id="round-buttons">
                        <button className="match-button red-border round-button" onClick={handleRemoveRound}>
                            {rounds.length > 0 ? "Remove Round" : "Make Changes"}</button>
                        <button className="match-button green-border round-button" onClick={handleAddRound}>Add Round</button>
                </div>
                : 
                <button id="start-match" className="match-button green-border " onClick={handleStartMatch}>Start Match!</button>
            }
           
        </div>
    )
}

const PreMatch = (props) => {
    const { setTimedMessage, setPlayers, players, setSport, matchOn, users, sports, setSports } = props
    useEffect( () => {
        try {
            const allSports = async () => setSports(await getSports())
            allSports()
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
                <select id="new-match-select" onChange={({target}) => handleSportChange(target.value)}
                    disabled={matchOn}>
                    {sports
                        ? sports.map(sport => 
                            <option key={sport._id}    
                            value={sport._id}>{sport.name}</option>)
                        : null
                    }
                </select>
            </div>
            <div>
                <datalist id="playerdatalist">
                    {users
                        ? users.map(u => <option key={u.username} value={u.username}></option>)
                        : null}
                </datalist>
                {
                players
                    ? players.map((player, index) =>
                        <div className="added-player" key={index}>
                            <label htmlFor={`player-${index}`}>{`Player ${index+1} `}</label>
                            <input 
                                className="player-input"
                                id={`player-${index}`} value={player}
                                autoComplete="off"
                                onChange={({target}) => handlePlayerInput(target.value, index)}
                                list="playerdatalist"
                                disabled={matchOn}/>
                            <button className="match-button red-border" id={`remove-player-${index}`} 
                                onClick={() => handlePlayerRemove(index)}
                                disabled={matchOn}>Remove</button>
                        </div>)
                    : null
                }
            </div>
            <br></br>
            <button className="match-button green-border" id="add-player" onClick={handleAddPlayer}
                disabled={matchOn}>Add Player</button>
        </div>
    )
}

export default Match