import BaseAPI from "./BaseAPI";
import {HEADERS} from "../utils/Constants";

export class WSAPI extends BaseAPI{

    constructor() {
        super('')
    }

    createToken(chatId: number): Promise<Response> {
        return this.http.post(`/chats/token/${chatId}`, {
            headers: HEADERS.JSON
        })
    }

    uploadFile(file: FormData): Promise<Response> {
        return this.http.post(`/resources`, {
            headers: HEADERS.JSON_GET,
            data: file
        })
    }

}
