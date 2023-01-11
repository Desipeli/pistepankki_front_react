import axios from "axios"
import { useEffect, useState } from "react";
import { Link, Route, Routes, Router } from "react-router-dom";


function App() {
  

  return (
    <div className="App">
      Hello there

      <Link to="/">home</Link>
      <Link to="userlist">userlist</Link>
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="userlist" element={<UserList/>} />
      </Routes>
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
