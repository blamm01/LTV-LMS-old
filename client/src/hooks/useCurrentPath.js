import { matchRoutes, useLocation } from "react-router-dom"
import { APP_ROUTES, routes } from "../routes"

export const useCurrentPath = () => {
    const paths = []
    
    routes.forEach(v => v.appRouteLinkTo
        ? paths.push({ path: APP_ROUTES[v.appRouteLinkTo.toUpperCase()] })
        : v.children.map(child => paths.push({ path: APP_ROUTES[child.appRouteLinkTo.toUpperCase()] }))
    )

    const location = useLocation()
    const [{ route }] = matchRoutes(paths, location)

    return route.path
}