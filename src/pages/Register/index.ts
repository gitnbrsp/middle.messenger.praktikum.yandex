import {Block} from "../../utils/Block";
import {Link, indexPage} from "../../components/Link";
import {template} from "./template";
import styles from "../../components/Link/styles.css";
import {
    email,
    first_name,
    login,
    password,
    phone,
    second_name
} from "../../components/Input";
import {Button} from "../../components/Button";
import {handleValidation} from "../../utils/utils";


export class Register extends Block {
    constructor() {
        super({}, {});
    }

    init() {
        this.children.first_name = first_name;
        this.children.second_name = second_name;
        this.children.login = login;
        this.children.email = email;
        this.children.phone = phone;
        this.children.password = password;
        this.children.signButton = new Button({
            text: "Создать аккаунт",
            name: "signButton",
            disabled: false,
            events: {
                click: (e) => {
                    handleValidation(e);
                }
            }
        } as ButtonProps);

        this.children.back = new Link({
            label: "назад",
            events: {
                click: ()=>{
                    history.pushState({}, "", "Login")
                }
            }
        } as LinkProps);
        this.children.indexPage = indexPage;
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
