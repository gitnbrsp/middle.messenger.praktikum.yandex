interface Chat {
    id: number,
    unread_count?: number,
    last_message?: string,
    created_by?: string,
    avatar?: string,
    color?: string,
    title: string,
    text: string
}

interface State {
    user: {
        user: User | null,
        isLoading: boolean,
        isError: boolean,
        errorMessage: string
    },
    chats: {
        chats: Chat[],
        isLoading: boolean,
        isError: boolean,
        errorMessage: string
    },
    messages?: {
        messages?: Message[] | [],
        isLoading: boolean,
        isError: boolean,
        errorMessage: string,
        activeChatId: number
    }
}
