import { Link } from "react-router-dom"


const Navbar = (props) => {
    const { user, setUser } = props
    return (
        <nav id='navbar'>
            <div id="navbar-logo"><Link to="/">Pistepankki</Link></div>
            <ul id="navbar-menu">
                <li className="li-navbar"><Link to="/">home</Link></li>
                <li className="li-navbar"><Link to="userlist">userlist</Link></li>
                {user 
                    ? <li className="li-navbar green-border">{user && <Link to="logout">Log Out</Link>}</li>
                    : <li className="li-navbar green-border">{!user && <Link to="login">Log in</Link> }</li>
                }                
            </ul>
            <div id="hamburger">&#9776;</div>
        </nav>
    )
}


export default Navbar