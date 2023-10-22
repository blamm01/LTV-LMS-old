import { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import { API_ROUTES } from "../constants/api";
import _ from "lodash";

const initialValue = {
    authenticated: false,
    session: null,
    user: null,
    token: ""
}

const authContextInitVal = {
    auth: initialValue,
    setAuth: (value) => null
}

export const AuthContext = createContext(authContextInitVal)

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage("auth", initialValue)
    const value = {
        setAuth,
        auth
    }

    useEffect(() => {
        if(auth?.token) {
            axios.get(API_ROUTES.GET_ME, {
                headers: {
                    Authorization: auth.token
                }
            }).then((response) => {
                let data = response.data
                if(!_.isEqual(data?.user, auth.user) || !_.isEqual(data?.session, auth.session)) setAuth({
                    authenticated: true,
                    session: data?.session,
                    user: data?.user,
                    token: auth.token
                })
            }, (error) => {
                if(error?.response?.data?.success === false) setAuth(initialValue)
            })
        }
    })

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}