import './global.css'
import * as pages from './pages/pages';
import {router} from "./utils/Router";
import {ROUTES} from "./utils/Constants";
import {handleValidation} from "./utils/Utils";
import authController from "./controllers/AuthController";
import chatController from "./controllers/ChatController";

// Handle validation on inputs
window.addEventListener('blur', (e)=>{
    handleValidation(e);
}, true);

window.addEventListener('focus', (e)=>{
    handleValidation(e);
}, true);

window.addEventListener('DOMContentLoaded', async () => {

    for (const page in pages){
        //@ts-ignore
        router.use(ROUTES[page], new pages[page]);
    }

    let isProtectedRoute = true;

    if ([ROUTES.Index, ROUTES.Register, ROUTES.Login].includes(window.location.pathname)){
        isProtectedRoute = false;
    }


    if (!Object.values(ROUTES).includes(window.location.pathname)){
        router.go(ROUTES.Error);
    }

    try {
        authController.fetchUser();
        chatController.fetchChats();

        router.start();

        if (!isProtectedRoute) {
            router.go(window.location.pathname);
        }
    } catch (e) {
        router.go(ROUTES.Error);
    }
});
