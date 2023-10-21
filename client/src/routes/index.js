import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthLogin from "../pages/Auth/Login";

export const APP_ROUTES = {
    LOGIN: "/auth/login"
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" />
            <Route path="/auth/login" element={<AuthLogin />} />
        </>
    )
)