import { Link} from 'react-router-dom'
import React from 'react';

const Nav = () => {
  return(
  <nav className="navbar has-background-black">
    <div className="navbar-brand">
      <div className="navbar-item">
        <Link to={`/games`}>
        <header className="is-size-2 has-text-weight-bold has-text-white">
          Where's Waldo?
        </header>
        </Link>
      </div>   
    </div>
  </nav>
  )
}

export default Nav