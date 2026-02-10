import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"
const ProtectedRoute = ({ children }) => {
    const jwtToken = Cookies.get("jwtToken")

    if (!jwtToken) {
        return <Navigate to="/login" replace/>
    }

    return children
}

export default ProtectedRoute
