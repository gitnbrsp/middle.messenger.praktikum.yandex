import {WSAPI} from "../api/WSAPI";
import {store} from '../utils/Store';
import {WS} from "./WS";
import {EVENTS, STORE} from "../utils/Constants";


class WSController{

    private api: WSAPI;
    private sockets: Record<string, WebSocket> | [];

    constructor() {
        this.api = new WSAPI();
        this.sockets = {};
    }

    private loading(): void {
        store.set('messages.messages', []);
        store.set('messages.isLoading', true);
        store.set('messages.hasError', false);
        store.set('messages.errorMessage', '');
    }

    createToken(chatId: number, userId: number): Promise<boolean> {
        return this.api.createToken(chatId).then((res: Record<string, unknown>)=>{
            //@ts-ignore
            if (res.response.token) {
                //@ts-ignore
                this.sockets[chatId as keyof object] = new WS(userId, chatId, res.response?.token);
                (this.sockets[chatId as keyof object] as WS).on(EVENTS.NEW_MESSAGES,
                    (messages: unknown, chatId: number)=>{
                        //@ts-ignore
                        if (chatId === store.getState()?.messages.activeChatId) {
                        store.set(STORE.MESSAGES_LOADING, false);
                        store.set(STORE.MESSAGES, messages);
                    }
                })
                return true
            }
            else {
                return false
            }
        });
    }

    checkWS(chatId: number, userId: number): Promise<boolean> {

        this.loading();
        store.set(STORE.ACTIVE_CHAT, chatId);

        setTimeout(()=>{
            store.set(STORE.MESSAGES_LOADING, false);
        }, 6000)

        if (Object.prototype.hasOwnProperty.call(this.sockets, chatId)) {
            store.set(STORE.MESSAGES_LOADING, false);
            store.set(STORE.MESSAGES, (this.sockets[chatId as keyof object] as WS).getMessages());
            return new Promise((resolve)=>{resolve(true)})
        } else {
            return this.createToken(chatId, userId).then(isCreated=>{
                if(isCreated) {
                    return true
                } else {
                    //todo: handle token creation fail
                    store.set(STORE.MESSAGES_LOADING, false);
                    store.set(STORE.ACTIVE_CHAT, 0);
                    store.set(STORE.MESSAGES_ERROR_MESSAGE, 'Chat token creation failed');
                    return false
                }
            })
        }
    }

    sendMessage(message: Record<string, unknown>): void {
        //@ts-ignore
        const chatId: number = store.getState().messages.activeChatId;

        if (chatId) {
            if (Object.prototype.hasOwnProperty.call(this.sockets, chatId)) {
                if (message.type === 'file') {
                    this.api.uploadFile(message.content as FormData)
                        .then((res: Record<string, unknown>)=>{

                            if (res.status === 200) {
                                //@ts-ignore
                                const id = res.response.id;
                                (this.sockets[chatId as keyof object] as WS)
                                .sendMessage(JSON.stringify({
                                    content: id,
                                    type: 'file'
                                }));
                        } else {
                            throw 'file upload error'
                        }
                    }).catch(err=>{
                        console.error('File sending failed', err)
                    })
                }
                else {
                    (this.sockets[chatId as keyof object] as WS)
                        .sendMessage(JSON.stringify(message));
                }
            }
        }
        else {
            //todo gracefully message
            alert('Select chat first')
        }
    }
}

export default new WSController();
