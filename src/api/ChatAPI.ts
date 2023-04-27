import BaseAPI from "./BaseAPI";
import {HEADERS} from "../utils/Constants";

export class ChatAPI extends BaseAPI {

    constructor() {
        super('/chats')
    }

    getChats(offset: number, limit: number, title: string) {
        return this.http.get('', {
            headers: HEADERS.JSON_GET,
            data: {offset: offset, limit: limit, title: title}
        })
    }

    createChat(title: string) {
        return this.http.post('', {
            headers: HEADERS.JSON,
            data: JSON.stringify({title: title})
        })
    }

    deleteChat(chatId: number) {
        return this.http.delete('', {
            headers: HEADERS.JSON,
            data: JSON.stringify({chatId: chatId})
        })
    }

    getChatFiles(id: number) {
        return this.http.get(`/${id}/files`, {
            headers: HEADERS.JSON_GET
        })
    }

    getChatUsers(id: number) {
        return this.http.get(`/${id}/users`, {
            headers: HEADERS.JSON_GET
        })
    }


    addChatUsers(users: number[], chatId: number) {
        return this.http.put('/users', {
            headers: HEADERS.JSON,
            data: JSON.stringify({
                users: users,
                chatId: chatId
            })
        })
    }

    deleteChatUsers(users, chatId) {
        return this.http.delete('/users', {
            headers: HEADERS.JSON,
            data: JSON.stringify({
                users: users,
                chatId: chatId
            })
        })
    }

    // getArchivedChats() {}
    //
    // archiveChat() {}
    //
    // unarchiveChat() {}
    //
    // getCommonChat() {}
    //
    // getNewMessagesCount() {}
    //
    // uploadChatAvatar() {}
    //
    // requestToken() {}
}
