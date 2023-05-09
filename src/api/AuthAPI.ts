import BaseAPI from "./BaseAPI";
import {HEADERS} from "../utils/Constants";
import {SigninData, SignupData} from "../interfaces/api";


export class AuthAPI extends BaseAPI {

    constructor() {
        super('/auth')
    }

    signup(data: SignupData): Promise<unknown> {
        return this.http.post('/signup', {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)
        })
    }

    signin(data: SigninData): Promise<unknown> {
        return this.http.post('/signin', {
            headers: HEADERS.JSON,
            data: JSON.stringify(data)
        })
    }

    logout(): Promise<unknown> {
        return this.http.post('/logout')
    }

    currentUser(): Promise<unknown> {
        return this.http.get('/user')
    }
}
