import BaseAPI from "./BaseAPI";
import {HEADERS} from "../utils/Constants";
import {User} from "../interfaces/components";

export class UserAPI extends BaseAPI {

    constructor() {
        super('/user')
    }

    updateProfile(data: User): Promise<unknown> {
        return this.http.put('/profile', {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)})
    }

    updateProfileAvatar(fd: FormData): Promise<unknown> {
        return this.http.put('/profile/avatar', {
            headers: HEADERS.JSON_GET,
            data: fd
        })
    }

    updatePassword(data: Record<string, unknown>): Promise<unknown> {
        return this.http.put('/password', {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)
        })
    }

    getUserById(id: string): Promise<Record<string, unknown>> {
        return this.http.get(`/${id}`, {
            headers: HEADERS.JSON_GET
        })
    }

    searchUser(data: {login: string}): Promise<Record<string, unknown>> {
        return this.http.post(`/search`, {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)})
    }

}
