import { Link } from "react-router-dom"


const Navbar = (props) => {
    const { user, setUser } = props
    return (
        <nav id='navbar'>
            <div id="navbar-logo"><Link to="/">Pistepankki</Link></div>
            <ul id="navbar-menu">
                <li className="li-navbar li-navbar-normal"><Link to="/">Home</Link></li>
                <li className="li-navbar li-navbar-normal"><Link to="newmatch">New Match</Link></li>
                <li className="li-navbar li-navbar-normal"><Link to="userlist">userlist</Link></li>
                {user 
                    ? <li className="li-navbar li-navbar-logout ">{user && <Link to="logout">Log Out</Link>}</li>
                    : <li className="li-navbar li-navbar-login ">{!user && <Link to="login">Log in</Link> }</li>
                }                
            </ul>
            <div id="hamburger">&#9776;</div>
        </nav>
    )
}


export default Navbar