import React,  {useState} from 'react'
import { Link } from 'react-router-dom'
import moon from '../../Image/moon.svg'
import './NavBar.css'

const NavBar = () => {
    const [darkMode, setDarkMode] = useState(false)

    const handleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <nav 
            className={darkMode ? 'darkModeNav' : 'lightModeNav'}
        >
            <ul>
                <section className='firstSection'>
                    <li><Link to='/' className={darkMode ? 'darkModeNav logo' : 'lightModeNav logo'} >BCard</Link></li>
                    <li><Link to='/about' className={darkMode ? 'darkModeNav' : 'lightModeNav'}>About</Link></li>
                </section>
                <section className='secondSection'>
                    <li>
                        <form>
                            <input type='search' placeholder='Search' />
                            <button type='submit'>Search</button>
                        </form>
                    </li>
                    <li><img onClick={handleDarkMode} src={moon} alt='Dark mode'/></li>
                </section>
            </ul>
        </nav>
    )
}

export default NavBar
