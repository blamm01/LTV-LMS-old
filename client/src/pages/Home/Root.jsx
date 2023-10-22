import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../routes";

export default function Root() {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(auth.authenticated) navigate(APP_ROUTES.DASHBOARD)
        else navigate(APP_ROUTES.LOGIN)
    }, [auth.authenticated])
}