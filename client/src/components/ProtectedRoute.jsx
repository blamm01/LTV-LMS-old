import { useContext } from "react";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { APP_ROUTES } from "../routes";

export default function ProtectedRoute() {
    const { auth } = useContext(AuthContext)
    const location = useLocation()
    return auth.authenticated ? <Outlet /> : <Navigate to={APP_ROUTES.LOGIN} state={{
        previous: location,
        message: "Bạn cần đăng nhập để tiếp tục"
    }} />
}