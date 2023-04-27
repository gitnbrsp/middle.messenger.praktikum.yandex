interface SignupData {
    "first_name": string,
    "second_name": string,
    "login": string,
    "email": string,
    "password": string,
    "phone": string
}

interface SignupData {
    "first_name": string,
    "second_name": string,
    "login": string,
    "email": string,
    "password": string,
    "phone": string
}

interface SigninData {
    "login": string,
    "password": string
}

interface Chat {
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

interface Error {
    "reason": string,
    "status": string
}

interface BadRequest {
    "reason": string
}
