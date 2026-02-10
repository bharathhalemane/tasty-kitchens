import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Auth/Login'
import Home from './components/Pages/Home/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => {
    return <Router>
        <Routes>
            <Route path="/login" element={<Login/> } />
            <Route path="/" element={<ProtectedRoute>
                <Home/>
            </ProtectedRoute> } />
        </Routes>
    </Router>    
}

export default App

