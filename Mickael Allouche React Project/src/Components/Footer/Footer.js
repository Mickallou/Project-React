import React from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom'
import { useTheUser } from '../../Context/TheUser'
import { useThemeMode } from '../../Context/ThemeMode'

const Footer = () => {
    const navigate = useNavigate()
    const { theUser } = useTheUser()
    const { darkMode } = useThemeMode()

    return (
        <div className={darkMode ? 'footer d-flex justify-content-center align-items-center position-fixed bottom-0 w-100 flex-wrap bg-dark footer-dark' : 'footer d-flex justify-content-center align-items-center position-fixed bottom-0 w-100 flex-wrap bg-secondary-subtle footer-ligth'}>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16" onClick={() => navigate('/about')}>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                <p>About</p>
            </div>
            { theUser && 
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16" onClick={() => navigate('/favCards')}>
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>  
                    <p>Fav Cards</p>
                </div> 
            }
            { theUser && theUser.isBusiness &&
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-rolodex" viewBox="0 0 16 16" onClick={() => navigate('/myCards')}>
                        <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                        <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1z"/>
                    </svg>                    
                    <p>My Cards</p>
                </div>
            }
        </div>
    )
}

export default Footer
