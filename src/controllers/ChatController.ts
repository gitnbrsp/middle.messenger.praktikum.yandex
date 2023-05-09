import {store} from "../utils/Store";
import {ChatAPI} from "../api/ChatAPI";
import {STORE} from "../utils/Constants";

class ChatController {
    private api: ChatAPI;

    constructor() {
        this.api = new ChatAPI();
    }

    private loading() {
        store.set(STORE.CHATS_LOADING, true);
        store.set(STORE.CHATS_ERROR, false);
        store.set(STORE.CHATS_ERROR_MESSAGE, '');
    }

    getChats(offset: number, limit: number, title: string): Promise<unknown> {
        this.loading();
        return this.api.getChats(offset, limit, title)
            .then((res: any)=>{
            if (res.status === 200 || res.status === 304) {
                store.set(STORE.CHATS_LOADING, false);
                return res;
            } else {
                store.set(STORE.CHATS_ERROR, true);
            }
        });
    }

    fetchChats(): Promise<void> {
        this.loading();
        return this.getChats(0,999, '').then((res: any) => {
                if (res.status < 401) {
                    store.set(STORE.CHATS, res.response);
                    store.set(STORE.CHATS_LOADING, false);
                }
                else {
                    store.set(STORE.CHATS_ERROR, true);
                    store.set(STORE.CHATS_ERROR_MESSAGE, 'Failed get chats');
                }
            })
    }

    createChat(title: string): Promise<unknown> {
        return this.api.createChat(title).then(res=>{
            return res;
        }).catch(()=>{
            store.set(STORE.CHATS_ERROR, true);
            store.set(STORE.CHATS_ERROR_MESSAGE, `Failed create chat with title ${title}`);
        })
    }

    deleteChat(chatId: number): Promise<unknown> {
        return this.api.deleteChat(chatId).then(res=>{
            this.fetchChats();
            return res;
        }).catch(()=>{
            store.set(STORE.CHATS_ERROR, true);
            store.set(STORE.CHATS_ERROR_MESSAGE, `Failed delete chat with ID ${chatId}`);
        })
    }

    deleteChatUser(users: number[], chatId: number): Promise<unknown> {
        return this.api.deleteChatUsers(users, chatId).then(res=>{
            this.fetchChats();
            return res;
        }).catch(()=>{
            store.set(STORE.CHATS_ERROR, true);
            store.set(STORE.CHATS_ERROR_MESSAGE, `Failed delete chat users`);
        })
    }

    addChatUsers(users: number[], chatId: number): Promise<unknown> {
        return this.api.addChatUsers(users, chatId).then(res=>{
            return res;
        }).catch(()=>{
            store.set(STORE.CHATS_ERROR, true);
            store.set(STORE.CHATS_ERROR_MESSAGE, `Failed add user to chat with ID ${chatId}`);
        })
    }

    getChatUsers(chatId: number): Promise<unknown> {
        return this.api.getChatUsers(chatId).then(res=>{
            return res;
        }).catch(()=>{
            store.set(STORE.CHATS_ERROR, true);
            store.set(STORE.CHATS_ERROR_MESSAGE, `Failed get chat users, ID ${chatId}`);
        })
    }

    updateChatAvatar(fd: FormData): Promise<unknown> {
        return this.api.uploadChatAvatar(fd).then(res=>{
            return res
        });
    }
}

export default new ChatController();
