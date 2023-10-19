import AuthLogin from "./views/AuthLogin";
import _404 from "./views/404"

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/404", view: _404 },
        { path: "/auth/login", view: AuthLogin },
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    console.log(match)

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
    
    const scripts = view.getScripts()
    if(scripts?.length > 0) await Promise.all(scripts.map(v => fetch(v).then(res => res.text()).then(v => eval(v))))
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    let er
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            const link = e.target.attributes.getNamedItem("data-link").value || e.target.href
            if(!link || typeof link != "string" || !link.startsWith("/")) location.reload()
            else navigateTo(link);
        }
    });

    router();
});