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

    return (
        <div id="current-match">
            
            {
                rounds.map((round, index) => 
                    <div className="round" id={`round-${index+1}`} key={`round-${index+1}`}>
                        <h1>Round {index}</h1>
                        {
                            players.map((player, Playerindex) =>
                                <div key={`roundplayer-${index}-${Playerindex}`}>
                                    <label htmlFor="round">{player}</label>
                                    <input type="number" id={`roundplayer-${index}-${Playerindex}`} step="1"></input>
                                </div>   
                            )
                        }
                    </div>
                )
            }
            <button id="new-round" onClick={handleAddRound}>Add Round</button>
        </div>
    )
    // return (
    //     <div id="current-match">
    //         {rounds
    //             ? rounds.map((round, index) => 
    //                 <div id={`round-${index}`} key={`round-${index}`}>
    //                     <p>Round {index + 1}</p>
    //                     {players
    //                         ? players.map((player, playerIndex) => 
    //                         <div key={`roundplayers-${index}-${playerIndex}`}>
    //                             <label htmlFor={`roundplayer-${playerIndex}`}>Player {playerIndex + 1}</label>
    //                             <input id={`roundplayer-${playerIndex}`} type="number" step={1}></input>
    //                          </div>
    //                         )  
    //                         : null}
    //                 </div>
    //             )
    //             : null
    //         }
    //         <button id="new-round">Add Round</button>
    //     </div>
    // )
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
                        <div key={index}>
                            <label htmlFor={`player-${index}`}>{`Player ${index+1} `}</label>
                            <input id={`player-${index}`} value={player}
                                onChange={({target}) => handlePlayerInput(target.value, index)}/>
                            <button className="match-button red-border" id={`remove-player-${index}`} 
                                onClick={() => handlePlayerRemove(index)}>Remove</button>
                        </div>)
                    : null
                }
            </div>
            <button className="match-button green-border" id="add-player" onClick={handleAddPlayer}>Add Player</button>
        </div>
    )
}

export default Match