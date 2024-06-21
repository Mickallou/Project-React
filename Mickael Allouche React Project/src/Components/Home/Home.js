import React from 'react'
import {useBusiness} from '../../Context/Business'
import {useThemeMode} from '../../Context/ThemeMode'
import {useContected} from '../../Context/Contected'
import { useAdmin } from '../../Context/Admin'

const Home = () => {
    const {isContected, setIsContected} = useContected()
    const {isBusiness, setIsBusiness} = useBusiness()
    const {isAdmin, setIsAdmin} = useAdmin()
    const {darkMode} = useThemeMode()
    return (
        <div className={darkMode ? 'bg-secondary p-3' : 'bg-primary-subtle p-3'}>
            <button type="button" className="btn btn-outline-danger" onClick={() => setIsContected(!isContected)}>Contected</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => setIsBusiness(!isBusiness)}>Business</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => setIsAdmin(!isAdmin)}>Admin</button>
        </div>
    )
}

export default Home
