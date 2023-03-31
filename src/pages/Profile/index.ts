import {Block} from "../../utils/Block";
import {Link, indexPage} from "../../components/Link";
import {template} from "./template";
import styles from "../../components/Link/styles.css";
import {
    email,
    first_name,
    login,
    display_name,
    phone,
    second_name
} from "../../components/Input";
import {Button} from "../../components/Button";
import {handleValidation} from "../../utils/utils";


export class Profile extends Block {
    constructor() {
        super({}, {});
    }

    init() {
        //todo: current profile data display
        this.children.first_name = first_name;
        this.children.second_name = second_name;
        this.children.display_name = display_name;
        this.children.login = login;
        this.children.email = email;
        this.children.phone = phone;
        this.children.signButton = new Button({
            text: "Сохранить изменения",
            name: "signButton",
            disabled: false,
            events: {
                click: (e) => {
                    handleValidation(e);
                }
            }
        } as ButtonProps);

        this.children.changePassword = new Link({
            label: "Смена пароля",
            events: {
                click: ()=>{
                    history.pushState({}, "", "Password")
                }
            }
        } as LinkProps);
        this.children.back = new Link({
            label: "назад",
            events: {
                click: ()=>{
                    history.pushState({}, "", "Chat")
                }
            }
        } as LinkProps);
        this.children.indexPage = indexPage;
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
