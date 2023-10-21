import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthLogin from "../pages/Auth/Login";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import ProtectedRoute from "../components/ProtectedRoute";

export const APP_ROUTES = {
    LOGIN: "/auth/login"
}

export function Root() {
    const { auth } = useContext(AuthContext)
    return (
        <pre>{JSON.stringify(auth, null, 2)}</pre>
    )
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route exact path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Root />} />
            </Route>
            <Route path="/auth/login" element={<AuthLogin />} />
        </>
    )
)