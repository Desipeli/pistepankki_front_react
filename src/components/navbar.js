import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  const { user, theme, setTheme } = props
  const [hamburgerMenu, setHamburgerMenu] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setHamburgerMenu(false)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  const handleThemeChange = (theme) => {
    document.documentElement.className = theme
    setTheme(theme)
    window.localStorage.setItem('theme', theme)
  }

  return (
    <nav id="navbar">
      <div id="logo-and-theme">
        <div id="navbar-logo">
          <Link to="/">Pistepankki</Link>
        </div>
        {theme === 'light' ? (
          <div className="theme" onClick={() => handleThemeChange('dark')}>
            🌃
          </div>
        ) : (
          <div className="theme" onClick={() => handleThemeChange('light')}>
            ☀️
          </div>
        )}
      </div>

      <HamburgerMenu
        hamburgerMenu={hamburgerMenu}
        setHamburgerMenu={setHamburgerMenu}
        user={user}
      />
      <NormalMenu user={user} />
      <div id="hamburger" onClick={() => setHamburgerMenu(!hamburgerMenu)}>
        &#9776;
      </div>
    </nav>
  )
}

const NormalMenu = (props) => {
  const { user } = props
  return (
    <ul id="navbar-menu">
      <li className="li-navbar li-navbar-normal">
        <Link to="/browse">Browse</Link>
      </li>
      {user ? (
        <>
          <li className="li-navbar li-navbar-normal">
            <Link to="newmatch">New Match</Link>
          </li>
          <li className="li-navbar li-navbar-normal">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="li-navbar li-navbar-logout ">
            {user && <Link to="logout">Log Out</Link>}
          </li>
        </>
      ) : (
        <li className="li-navbar li-navbar-login ">
          {!user && <Link to="login">Log in</Link>}
        </li>
      )}
    </ul>
  )
}

const HamburgerMenu = (props) => {
  const { hamburgerMenu, setHamburgerMenu, user } = props

  if (hamburgerMenu) {
    return (
      <div id="hamburger-menu-background">
        <ul id="hamburger-menu" onClick={() => setHamburgerMenu(false)}>
          <li className="li-hamburger">
            <Link to="/browse">Browse</Link>
          </li>
          {user ? (
            <>
              <li className="li-hamburger">
                <Link to="newmatch">New Match</Link>
              </li>
              <li className="li-hamburger">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="li-hamburger">
                {user && <Link to="logout">Log Out</Link>}
              </li>
            </>
          ) : (
            <li className="li-hamburger">
              {!user && <Link to="login">Log in</Link>}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Navbar
