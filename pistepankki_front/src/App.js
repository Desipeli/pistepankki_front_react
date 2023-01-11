import axios from "axios"
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="userlist" element={<UserList/>} />
        <Route path="login" element={<LoginScreen user={ user } setUser={setUser} />}  />
      </Routes>
      Hello there
    </div>
  )
}

const Home = () => {
  return (
    <div>
      koti
    </div>
  )
}

const LoginScreen = (props) => {
  const { user, setUser } = props
  if (user) return <></>

  return (
    <>
    <LoginForm />
    </>
    
  )
}

const LoginForm = () => {
  return (
    <div>
      <label htmlFor="input-username">Username</label>
      <input id="input-username" type="text"></input>
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
