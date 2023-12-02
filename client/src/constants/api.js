import { config } from "../config/index.js"

const API = process.env.NODE_ENV === "production" ? config.server.online.link : config.server.local.link

export const API_ROUTES = {
  LOGIN: `${API}/sessions/create`,
  GET_ME: `${API}/users/get/@me`,
  LOGOUT: `${API}/sessions/destroy`
}