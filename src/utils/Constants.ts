export const ROUTES = {
    Login: '/',
    Chat: '/messenger',
    Register: '/sign-up',
    Profile: '/settings',
    Index: '/navigation',
    Password: '/password',
    Error: '/error',
    // 404: '/404.html',
    // 500: '/500.html',
}

export const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
}

export const EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    UPDATED: 'Updated',
    NEW_MESSAGES: 'NEW_MESSAGE',
}

export const HEADERS = {
    JSON: {
        accept: 'application/json',
        'Content-Type': 'application/json'
    },
    JSON_GET: {
        accept: 'application/json',
    },
    DATA: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data'
    }
}

export const URLS = {
    DEFAULT_AVATAR: 'https://www.svgrepo.com/show/452030/avatar-default.svg',
    RESOURCES: 'https://ya-praktikum.tech/api/v2/resources/',
    API_BASEPATH: 'https://ya-praktikum.tech/api/v2'
}

export const STORE = {
    MESSAGES_LOADING: 'messages.isLoading',
    MESSAGES_ERROR: 'messages.isError',
    MESSAGES_ERROR_MESSAGE: 'messages.errorMessage',
    MESSAGES: 'messages.messages',
    ACTIVE_CHAT: 'messages.activeChatId',

    CHATS_LOADING: 'chats.isLoading',
    CHATS_ERROR: 'chats.hasError',
    CHATS_ERROR_MESSAGE: 'chats.errorMessage',
    CHATS: 'chats.chats',

    USER_LOADING: 'user.isLoading',
    USER_ERROR: 'user.hasError',
    USER_ERROR_MESSAGE: 'user.errorMessage',
    USER: 'user.user',
}
