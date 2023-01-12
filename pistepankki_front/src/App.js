import axios from "axios"
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import LoginScreen from "./components/login";

function App() {
  const [user, setUser] = useState(null)

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
      <Navbar user={user} />
      <div id="content">  
        <Routes>
          <Route path="" element={<Home/>} />
          <Route path="userlist" element={<UserList/>} />
          <Route path="login" element={<LoginScreen user={ user } setUser={setUser} />}  />
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
    axios
      .get('http://localhost:3001/api/users')
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  const displayUserList = users.map(user => <li key={user._id}>{user.username}</li>)

  return (
    <ul>
      {displayUserList}
    </ul>
  )
}

export default App;
