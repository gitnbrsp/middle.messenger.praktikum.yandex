
interface User {
    "id": number,
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string,
    "avatar": string
}

interface ButtonProps {
    text: string;
    name: string;
    disabled: boolean;
    events: {
        click: () => void;
    };
}

interface UserCardProps {
    text: string;
    title: string;
    color?: string;
    events?: {
        click: () => void;
    };
}

interface UsersCardsProps {
    chats: UserCardProps[];
}

interface LoadingProps {
    width?: string | number;
    height?: string | number;
    color?: string;
}

interface ChatMenuProps {
    events?: {
        click: () => void;
        hover: () => void;
    };
}

interface AccountDataProps extends User{
    events?: {
        click: () => void;
    };
}

interface Message {
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

interface MessagesProps {
    messages: Message[] | []
}

interface AvatarProps{
    width: number;
    height: number;
    imagePath: string;
    events?: {
        click: () => void;
    };
}

interface InputProps {
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

interface SearchProps {
    value?: string | number;
    events: {
        input: () => void;
    };
}

interface LinkProps {
    id?: string;
    label: string;
    events?: {
        click: () => void;
    };
}

interface MessageFormProps {
    events?: {
        submit: () => void;
    };
}

interface WarningMsgProps {
    text?: string
}
