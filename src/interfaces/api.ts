import {User} from "./components";

export interface SignupData {
    "first_name": string,
    "second_name": string,
    "login": string,
    "email": string,
    "password": string,
    "phone": string
}

export interface SignupData {
    "first_name": string,
    "second_name": string,
    "login": string,
    "email": string,
    "password": string,
    "phone": string
}

export interface SigninData {
    "login": string,
    "password": string
}

export interface Chat {
    "id": number,
    "title": string,
    "avatar": string,
    "unread_count": number,
    "last_message"?: {
        "user": User
        "time": string,
        "content": string
    }
}

export interface Error {
    "reason": string,
    "status": string
}

export interface BadRequest {
    "reason": string
}
