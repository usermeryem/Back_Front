import {faBars, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = ({openSideBar}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-nav px-1" >
      <div className="container-fluid">
        <button onClick={openSideBar} className='btn' ><FontAwesomeIcon color='black' icon={faBars}/></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/'>Bienvenu</Link>
            </li>                         
          </ul>         
        </div>
        <div className='dropdown d-flex dropstart'>       
          <Link className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <FontAwesomeIcon color='white' icon={faUserCircle}/>Utilisateur 
          </Link>
          <ul className="dropdown-menu ">
            <li><Link className="dropdown-item text-dark" to="/login">Se connecter</Link></li>
            <li><Link className="dropdown-item text-dark" to="/register">S'enregistrer</Link></li>         
          </ul>             
        </div> 
      </div>
    </nav>
  )
}

export default Navbar