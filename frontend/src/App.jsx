import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Auth/Login'
import Home from './components/Pages/Home/Home'
import RestaurantDetail from './components/Pages/RestaurantDetail/RestaurantDetail'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => {        
    const [cartData, setCartData] = useState(() => {
        const stored = localStorage.getItem("cartData");
        return stored ? JSON.parse(stored) : [];
    });               
    
    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(cartData))   
    }, [cartData])
    
    return <Router>
        <Routes>
            <Route path="/login" element={<Login/> } />
            <Route path="/" element={<ProtectedRoute>
                <Home/>
            </ProtectedRoute>} />
            <Route path="/restaurant/:id" element={<ProtectedRoute>
                <RestaurantDetail setCartData={setCartData} />
            </ProtectedRoute> } />
        </Routes>
    </Router>    
}

export default App
