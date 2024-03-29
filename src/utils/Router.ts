import {Block} from "./Block";

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const app = document.querySelector(query) as HTMLElement;
    const content = block.getContent();
    app.replaceChildren(content as Node);
    return app;
}

class Route {
    private block: Block | null = null;

    constructor(
        private pathname: string,
        private blockClass: Block,
        private query: string) {
    }

    leave() {
        this.block = null;
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname);
    }

    render() {
        if (!this.block) {
            this.block = this.blockClass;
            render(this.query, this.block);
        }
    }
}

class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private currentRoute: Route | null = null;
    private history = window.history;

    constructor(private rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];

        Router.__instance = this;
    }

    public use(pathname: string, block: Block) {
        const route = new Route(pathname, block, this.rootQuery);
        this.routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        }

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;

        route.render();
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    private getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export const router = new Router('#app');
