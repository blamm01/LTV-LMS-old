import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthLogin from "../pages/Auth/Login";
import Auth from "../pages/Auth/Root";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/"></Route>
            <Route path="/auth" element={<Auth />}>
                <Route path="login" element={<AuthLogin />}></Route>
            </Route>
        </>
    )
)