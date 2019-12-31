import React from 'react'
import { Link } from 'react-router-dom'

const titleStyle = {
  fontWeight: 'bold',
}

const NavBar = props => (
  <nav
    className="navbar is-dark"
    role="navigation"
    aria-label="main navigation"
  >
    <section className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item nav-title" style={titleStyle}>
          {props.title}
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/about" className="navbar-item">
            About
          </Link>
          <Link to="/status" className="navbar-item">
            User Status
          </Link>
        </div>
        <div className="navbar-end">
          <Link to="/register" className="navbar-item">
            Register
          </Link>
          <Link to="/login" className="navbar-item">
            Log In
          </Link>
          <Link to="/logout" className="navbar-item">
            Log Out
          </Link>
        </div>
      </div>
    </section>
  </nav>
)

export default NavBar
