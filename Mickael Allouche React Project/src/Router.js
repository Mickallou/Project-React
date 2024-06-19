import React from 'react'
import { Routes, Route } from 'react-router-dom'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<p>Home</p>} /> 
            <Route path="/about" element={<p>About</p>} />
        </Routes>
    )
}

export default Router
