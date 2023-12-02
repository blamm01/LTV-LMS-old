import { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import { API_ROUTES } from "../constants/api";
import _ from "lodash";
import { defaultPerm } from "../typings/permissions";

const initialValue = {
  authenticated: false,
  session: null,
  user: null,
  token: "",
  permissions: defaultPerm
}

const authContextInitVal = {
  auth: initialValue,
  setAuth: () => null
}

export const AuthContext = createContext(authContextInitVal)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", initialValue)
  const value = {
    setAuth,
    auth
  }

  useEffect(() => {
    if (auth?.token) {
      axios.get(API_ROUTES.GET_ME, {
        headers: {
          Authorization: auth.token
        }
      }).then((response) => {
        let data = response.data
        if (!_.isEqual(data?.user, auth.user) || !_.isEqual(data?.session, auth.session) || !_.isEqual(data?.permissions, auth.permissions)) setAuth({
          authenticated: true,
          session: data?.session,
          user: data?.user,
          token: auth.token,
          permissions: data?.permissions
        })
      }, (error) => {
        if (error?.response?.data?.success === false) setAuth(initialValue)
      })
    }
  })

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}