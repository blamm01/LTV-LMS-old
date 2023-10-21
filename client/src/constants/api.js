import { config } from "../config/index.js"

const API = config.server.local.link

export const API_ROUTES = {
    LOGIN: `${API}/sessions/create`,
    GET_ME: `${API}/users/get/@me`
}