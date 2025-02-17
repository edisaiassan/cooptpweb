import { useContext } from "react"
import AuthContext from "../pages/context/AuthContext"
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({ children }) => {

    const { user } = useContext(AuthContext)

    return user ? <Navigate to='/' /> : children
}
