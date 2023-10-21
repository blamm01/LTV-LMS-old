import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthLogin from "../pages/Auth/Login";
import AuthLayout from "../pages/Auth/Layout";

export const APP_ROUTES = {
    LOGIN: "/auth/login"
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/"></Route>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<AuthLogin />}></Route>
            </Route>
        </>
    )
)