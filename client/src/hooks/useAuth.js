import axios from 'axios';
import { getFromLocalStorage } from '../utils';
import { API_ROUTES } from '../constants/api';
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

async function getLoggedInUser() {
    let returnObj = { authenticated: false, user: null, session: null };
    try {
        const token = getFromLocalStorage('token');
        if (!token) {
            return returnObj;
        }
        const response = await axios({
            method: 'GET',
            url: API_ROUTES.GET_ME,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        if (data?.session && data?.user) returnObj = {
            authenticated: true,
            user: data.user,
            session: data.session
        }
    } catch (err) {
        console.log(err);
    }
    return returnObj
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    navigate("/dashboard/profile", { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
