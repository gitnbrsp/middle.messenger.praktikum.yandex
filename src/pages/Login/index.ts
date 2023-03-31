import {Block} from "../../utils/Block";
import {Link, indexPage} from "../../components/Link";
import {template} from "./template";
import styles from "../../components/Link/styles.css";
import {login, password} from "../../components/Input";
import {Button} from "../../components/Button";
import {handleValidation, validateForm} from "../../utils/utils";


export class Login extends Block {
    constructor() {
        super({}, {});
    }

    init() {
        this.children.login = login;
        this.children.password = password;
        this.children.signButton = new Button({
            text: "Войти",
            name: "signButton",
            disabled: false,
            events: {
                click: (e) => {
                    handleValidation(e);
                }
            }
        } as ButtonProps);
        this.children.createAccount = new Link({
            label: "Создать аккаунт",
            events: {
                click: ()=>{
                    history.pushState({}, "", "Register")
                }
            }
        } as LinkProps);
        this.children.indexPage = indexPage;
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
