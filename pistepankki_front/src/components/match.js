import { useEffect, useState } from "react"
import { redirect } from "react-router-dom"
import getSports from "../services/sportService"
import getAllUsers from "../services/userService"

const Match = (props) => {
    const { setTimedMessage } = props
    const [players, setPlayers] = useState([])
    const [sport, setSport] = useState([])

    return (
        <>
        <PreMatch setTimedMessage={setTimedMessage}
            setPlayers={setPlayers}
            players={players}
            setSport={setSport}/>
        </>
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
    console.log(sports)
    const handleAddPlayer = () => {
        setPlayers(players.concat(""))
        console.log(players)
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
                            <label htmlFor={`player-${index}`}>{`Player ${index+1}`}</label>
                            <input id={`player-${index}`} value={player}
                                onChange={({target}) => handlePlayerInput(target.value, index)}/>
                            <button id={`remove-player-${index}`} 
                                onClick={() => handlePlayerRemove(index)}>Remove</button>
                        </div>)
                    : null
                }
            </div>
            <button id="add-player" onClick={handleAddPlayer}>Add Player</button>
        </div>
    )
}

export default Match