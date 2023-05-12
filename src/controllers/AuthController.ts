import {AuthAPI} from '../api/AuthAPI';

import {router} from '../utils/Router';
import {store} from '../utils/Store';
import {ROUTES, STORE} from "../utils/Constants";

import chatController from "./ChatController";
import {SigninData, SignupData} from "../interfaces/api";

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    private loading() {
        store.set(STORE.USER_LOADING, true);
        store.set(STORE.USER_ERROR, false);
        store.set(STORE.USER_ERROR_MESSAGE, ``);
    }

    async signin(data: SigninData) {
        this.loading();
        await this.api.signin(data).then((res: Record<string, unknown>)=>{
            if ((res.status as number) < 401) {
                this.fetchUser();
                chatController.fetchChats();
                router.go(ROUTES.Chat);
            } else {
                store.set(STORE.USER_ERROR_MESSAGE, res.reason ? res.reason : res.statusText);
            }
        });
    }

    async signup(data: SignupData): Promise<void> {
        try {
            await this.api.signup(data);
            await this.fetchUser();
        } catch (err) {
            store.set(STORE.USER_ERROR, true);
            store.set(STORE.USER_ERROR_MESSAGE, err);
        }
    }

    logout() {
        this.api.logout()
            .then(() => {
                store.set(STORE.USER, null);
                store.set(STORE.CHATS, []);
                store.set(STORE.MESSAGES, []);
                store.set(STORE.ACTIVE_CHAT, 0);

                router.go(ROUTES.Login);
            })
    }

    async fetchUser() {
        this.loading();
        await this.api.currentUser()
            .then((res: Record<string, unknown>)=> {
                if ((res.status as number) < 401) {
                    store.set(STORE.USER, res.response);
                }
                else {
                    store.set(STORE.USER_ERROR, true);
                    store.set(STORE.USER_ERROR_MESSAGE,
                        res.reason as string ? res.reason as string : res.statusText as string);
                }
            })
            .finally(() => {
                store.set(STORE.USER_LOADING, false);
            });
    }
}

export default new AuthController();
