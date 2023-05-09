export interface User {
    "id": number,
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string,
    "avatar": string
}

export interface ButtonProps {
    text: string;
    name: string;
    title?: string;
    disabled: boolean;
    events: {
        click: () => void;
    };
}

export interface UserCardProps {
    text: string;
    title: string;
    color?: string;
    events?: {
        click: () => void;
    };
}

export interface UsersCardsProps {
    chats: UserCardProps[];
}

export interface LoadingProps {
    width?: string | number;
    height?: string | number;
    color?: string;
}

export interface ChatMenuProps {
    events?: {
        click: () => void;
        hover: () => void;
    };
}

export interface AccountDataProps extends User{
    events?: {
        click: () => void;
    };
}

export interface Message {
    author?: boolean;
    chat_id: number,
    time: string,
    type: string,
    user_id: string,
    content: string,
    file?: {
        id: number,
        user_id: number,
        path: string,
        filename: string,
        content_type: string,
        content_size: number,
        upload_date: string,
    }
}

export interface MessagesProps {
    messages: Message[] | []
}

export interface AvatarProps{
    width: number;
    height: number;
    imagePath: string;
    events?: {
        click: () => void;
    };
}

export interface InputProps {
    value?: string | number;
    placeholder: string;
    id: string;
    type: string;
    name: string;
    warning?:string;
    events: {
        click: () => void;
        blur: () => void;
        focus: () => void;
    };
}

export interface SearchProps {
    value?: string | number;
    events: {
        input: () => void;
    };
}

export interface LinkProps{
    label: string;
    events?: {
        click: () => void;
    };
}

export interface MessageFormProps {
    events?: {
        submit: () => void;
    };
}

export interface WarningMsgProps {
    text?: string
}
