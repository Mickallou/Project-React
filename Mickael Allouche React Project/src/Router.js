import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import FavCard from './Components/FavCard/FavCard'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<p>About</p>} />
            <Route path="/login" element={<p>Login</p>} />
            <Route path="/register" element={<p>Register</p>} />
            <Route path="/favCards" element={<FavCard /> } />
            <Route path="/myCards" element={<p>My Cards</p>} />
            <Route path="/sandBox" element={<p>SandBox</p>} /> 
        </Routes>
    )
}

export default Router
