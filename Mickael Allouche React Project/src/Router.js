import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import FavCardPage from './Components/FavCard/FavCardPage'
import Login from './Components/Login/Login'
import BusinessCard from './Components/Card/BusinessCard'
import Register from './Components/Register/Register'
import NewCard from './Components/Card/NewCard'
import OneCard from './Components/Card/OneCard'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<p>About</p>} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favCards" element={<FavCardPage /> } />
            <Route path="/myCards" element={<BusinessCard />} />
            <Route path="/sandBox" element={<p>SandBox</p>} /> 
            <Route path="/newCard" element={<NewCard />} />
            <Route path="/cards/:id" element={<OneCard />} />
        </Routes>
    )
}

export default Router
