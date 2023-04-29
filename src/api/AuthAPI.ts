import BaseAPI from "./BaseAPI";
import {HEADERS} from "../utils/Constants";

export class AuthAPI extends BaseAPI {

    constructor() {
        super('/auth')
    }


    signup(data: SignupData): Promise<Response> {
        return this.http.post('/signup', {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)
        })
    }

    signin(data: SigninData): Promise<Response> {
        return this.http.post('/signin', {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)
        })
    }

    logout(): Promise<Response> {
        return this.http.post('/logout')
    }

    currentUser(): Promise<Response> {
        return this.http.get<User | BadRequest>('/user')
    }
}
