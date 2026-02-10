import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './components/Auth/Login'
import Home from './components/Pages/Home/Home'
import RestaurantDetail from './components/Pages/RestaurantDetail/RestaurantDetail'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Cart from './components/Pages/Cart/Cart'
import Payment from './components/Pages/Payment/Payment'
import PageNotFound from './components/Pages/PageNotFound/PageNotFound'

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
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute>
                <Home />
            </ProtectedRoute>} />
            <Route path="/restaurant/:id" element={<ProtectedRoute>
                <RestaurantDetail setCartData={setCartData} cartData={cartData} />
            </ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute>
                <Cart setCartData={setCartData} cartData={cartData} />
            </ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute>
                <Payment />
            </ProtectedRoute>} />
            <Route path="/not-found" element={<ProtectedRoute>
                <PageNotFound />
            </ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
    </Router>
}

export default App
