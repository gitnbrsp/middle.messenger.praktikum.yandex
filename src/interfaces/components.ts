
interface User {
    id?: string;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
}

interface ButtonProps {
    text: string;
    name: string;
    disabled: boolean;
    events: {
        click: () => void;
    };
}

interface UserCardsProps {
    users: any[];
    color?: string;
    events?: {
        click: () => void;
    };
}

interface AccountDataProps extends User{
    events?: {
        click: () => void;
    };
}

interface InputProps {
    placeholder: string;
    type: string;
    name: string;
    events: {
        click: () => void;
        blur: () => void;
        focus: () => void;
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
