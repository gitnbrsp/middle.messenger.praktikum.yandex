import './global.css'
import * as pages from './pages/pages';

const app:HTMLElement | null = document.querySelector("#app");

window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray) => {
        //argArray[2] - path для url из ссылки
        const page: string = argArray[2];
        app!.replaceChildren((new pages[page]()).render());
        document.title = page;
        // history.replaceState({}, "", page)
    },
});

window.addEventListener('DOMContentLoaded', async () => {
    app!.replaceChildren((new pages["Index"]()).render());
});
