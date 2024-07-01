import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import FavCardPage from './Components/FavCard/FavCardPage'
import Login from './Components/Login/Login'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<p>About</p>} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={<p>Register</p>} />
            <Route path="/favCards" element={<FavCardPage /> } />
            <Route path="/myCards" element={<p>My Cards</p>} />
            <Route path="/sandBox" element={<p>SandBox</p>} /> 
        </Routes>
    )
}

export default Router
