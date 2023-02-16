import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/navbar'
import LoginScreen from './components/login'
import Match from './components/match'
import { LogOut } from './components/login'

import Notification from './components/notification'
import BrowseGames from './components/browse'
import Game from './components/game'

function App() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [currentMessageTimeout, setCurrentMessageTimeout] = useState(null)

  const setTimedMessage = (mess, timeout) => {
    if (currentMessageTimeout) {
      clearTimeout(currentMessageTimeout)
    }
    setMessage(mess)
    const timeId = setTimeout(() => {
      setMessage(null)
    }, timeout)
    setCurrentMessageTimeout(timeId)
  }

  // Check if user logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Notification message={message} />
      <div id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="userlist" element={<UserList />} />
          <Route
            path="login"
            element={
              <LoginScreen
                user={user}
                setUser={setUser}
                setTimedMessage={setTimedMessage}
              />
            }
          />
          <Route path="logout" element={<LogOut />} />
          <Route
            path="newmatch"
            element={<Match setTimedMessage={setTimedMessage} user={user} />}
          />
          <Route
            path="browse"
            element={<BrowseGames setTimedMessage={setTimedMessage} />}
          />
          <Route
            path="game/:id"
            element={<Game setTimedMessage={setTimedMessage} />}
          />
        </Routes>
        Hello there
      </div>
    </div>
  )
}

const Home = () => {
  useEffect(() => {
    document.title = 'Pistepankki'
  }, [])

  return (
    <div>
      <p></p>
    </div>
  )
}

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/users').then((res) => {
      setUsers(res.data)
    })
  }, [])

  const displayUserList = users.map((user) => (
    <li key={user._id}>{user.username}</li>
  ))

  return <ul>{displayUserList}</ul>
}

export default App
