import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthLogin from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
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
            <Route path={APP_ROUTES.LOGIN} element={<AuthLogin />} />
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
            </Route>
        </>
    )
)