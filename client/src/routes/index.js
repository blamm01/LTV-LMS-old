import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthLogin from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthLayout from "../components/AuthLayout";
import Root from "../pages/Home/Root";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard/Root";

export const APP_ROUTES = {
    LOGIN: "/auth/login",
    DASHBOARD: "/dashboard/"
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />} />
            <Route element={<AuthLayout />}>
                <Route path="/auth/login" element={<AuthLogin />} />
            </Route>
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={Dashboard} />
            </Route>
        </>
    )
)