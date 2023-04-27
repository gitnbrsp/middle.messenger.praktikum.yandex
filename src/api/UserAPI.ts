import BaseAPI from "./BaseAPI";
import {HEADERS} from "../utils/Constants";

export class UserAPI extends BaseAPI {

    constructor() {
        super('/user')
    }

    updateProfile(data: User): Promise<Response> {
        return this.http.put('/profile', {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)})
    }

    updateProfileAvatar(fd: FormData): Promise<Response> {
        return this.http.put('/profile/avatar', {
            headers: HEADERS.JSON_GET,
            data: fd
        })
    }

    updatePassword(data: Record<string, unknown>): Promise<Response> {
        return this.http.put('/password', {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)
        })
    }

    getUserById(id: string): Promise<Response> {
        return this.http.get(`/${id}`, {
            headers: HEADERS.JSON_GET
        })
    }

    searchUser(data: {login: string}): Promise<Response> {
        return this.http.post(`/search`, {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)})
    }

}
