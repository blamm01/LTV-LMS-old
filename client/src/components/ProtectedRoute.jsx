import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { APP_ROUTES } from "../routes";

export default function ProtectedRoute({ children }) {
    const { auth } = useContext(AuthContext)
    const location = useLocation()
    return auth.authenticated ? children : <Navigate to={APP_ROUTES.LOGIN} state={{
        previous: location,
        message: "Bạn cần đăng nhập để tiếp tục"
    }} />
}