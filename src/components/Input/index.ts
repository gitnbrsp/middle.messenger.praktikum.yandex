import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {handleValidation} from "../../utils/utils";

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}

export const login = new Input({
    placeholder: "Логин",
    name: "login",
    type: "text",
    events: {
        blur: (event)=>{
            handleValidation(event);
            // event.currentTarget.classList.remove("warning");
        },
        focus: (event) => {
            handleValidation(event);
            // event.currentTarget.classList.add("warning");
        }
    }
} as InputProps);

export const password = new Input({
    placeholder: "Пароль",
    name: "password",
    type: "password",
    events: {
        blur: (event)=>{
            handleValidation(event);
            // event.currentTarget.classList.remove("warning");
        },
        focus: (event) => {
            handleValidation(event);
            // event.currentTarget.classList.add("warning");
        }
    }
} as InputProps);

export const newPassword = new Input({
    placeholder: "Новый пароль",
    name: "newPassword",
    type: "password",
    events: {
        blur: (event)=>{
            handleValidation(event);
            // event.currentTarget.classList.remove("warning");
        },
        focus: (event) => {
            handleValidation(event);
            // event.currentTarget.classList.add("warning");
        }
    }
} as InputProps);

export const confirmPassword = new Input({
    placeholder: "Подтвердите пароль",
    name: "confirmPassword",
    type: "password",
    events: {
        blur: (event)=>{
            handleValidation(event);
            // event.currentTarget.classList.remove("warning");
        },
        focus: (event) => {
            handleValidation(event);
            // event.currentTarget.classList.add("warning");
        }
    }
} as InputProps);

export const first_name = new Input({
    placeholder: "Имя",
    name: "first_name",
    type: "text",
    events: {
        blur: (event)=>{
            handleValidation(event);
            // event.currentTarget.classList.remove("warning");
        },
        focus: (event) => {
            handleValidation(event);
            // event.currentTarget.classList.add("warning");
        }
    }
} as InputProps);

export const second_name = new Input({
    placeholder: "Фамилия",
    name: "second_name",
    type: "text",
    events: {
        blur: (event)=>{
            handleValidation(event);
            // event.currentTarget.classList.remove("warning");
        },
        focus: (event) => {
            handleValidation(event);
            // event.currentTarget.classList.add("warning");
        }
    }
} as InputProps);

export const email = new Input({
    placeholder: "Почта",
    name: "email",
    type: "text",
    events: {
        blur: (event)=>{
            handleValidation(event);
            // event.currentTarget.classList.remove("warning");
        },
        focus: (event) => {
            handleValidation(event);
            // event.currentTarget.classList.add("warning");
        }
    }
} as InputProps);

export const phone = new Input({
    placeholder: "Телефон",
    name: "phone",
    type: "text",
    events: {
        blur: (event)=>{
            handleValidation(event);
            // event.currentTarget.classList.remove("warning");
        },
        focus: (event) => {
            handleValidation(event);
            // event.currentTarget.classList.add("warning");
        }
    }
} as InputProps);

export const display_name = new Input({
    placeholder: "Имя в чате",
    name: "display_name",
    type: "text",
    warning: "",
    events: {
        blur: (event)=>{
            handleValidation(event);
            // event.currentTarget.classList.remove("warning");
        },
        focus: (event) => {
            handleValidation(event);
            // event.currentTarget.classList.add("warning");
        }
    }
} as InputProps);
