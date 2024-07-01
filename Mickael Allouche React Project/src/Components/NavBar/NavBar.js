import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import { useThemeMode } from '../../Context/ThemeMode'
import { useBusiness } from '../../Context/Business'
import { useAdmin } from '../../Context/Admin'
import { useTheUser } from '../../Context/TheUser'
import { useToken } from '../../Context/Token'

const NavBar = () => {
    const {darkMode, setDarkMode} = useThemeMode()
    const {isBusiness} = useBusiness()
    const {isAdmin} = useAdmin()
    const {theUser, setTheUser} = useTheUser()
    const {setTheToken} = useToken()

    const handleLogout = () => {
        setTheUser(null);
        setTheToken(null);
    }

    console.log('theUser:', theUser)

    return (
        <nav className='navbar navbar-expand-lg' id={darkMode ? 'darkMode' : 'lightMode'}>
            <div className="container-fluid">
                <Link to='/' className="navbar-brand text-white" id='pageName'>BCard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/about' className="nav-link active text-white" aria-current="page">ABOUT</Link>
                        </li>
                        {theUser &&
                            <li className="nav-item">
                                <Link to='/favCards' className="nav-link active text-white" aria-current="page">FAV CARDS</Link>
                            </li>
                        }
                        { isBusiness &&
                            <li className="nav-item">
                                <Link to='/myCards' className="nav-link active text-white" aria-current="page">MY CARDS</Link>
                            </li>
                        }
                        { isAdmin &&
                            <li className="nav-item">
                                <Link to='/sandBox' className="nav-link active text-white" aria-current="page">SANDBOX</Link>
                            </li>
                        }
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                    { !darkMode &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon-fill mx-2" viewBox="0 0 16 16" onClick={() => setDarkMode(!darkMode)}>
                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                        </svg>
                    }
                    { darkMode &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-brightness-high mx-2 text-white" viewBox="0 0 16 16" onClick={() => setDarkMode(!darkMode)}>
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                        </svg>
                    }

                    { !theUser &&
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/login' className="nav-link active text-white" aria-current="page">LOGIN</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/register' className="nav-link active text-white" aria-current="page">REGISTER</Link>
                            </li>
                        </ul>
                    }

                    { theUser &&
                        <div className='d-flex gap-3'>

                                    <img src={theUser.image.url} alt={theUser.image.alt} className='userImg' />
                                    <button className="nav-link active text-white" aria-current="page" onClick={handleLogout}>LOGOUT</button>
                        </div>
                    }
                    
                </div>
            </div>
        </nav>
)
}

export default NavBar
