import {Block} from "../../utils/Block";
import {Link} from "../../components/Link";
import {template} from "./template";
import styles from "../../components/Link/styles.css";


export class Index extends Block {

    constructor() {
        super({}, {});
    }

    init() {
        this.children.login = new Link({
            label: "Вход",
            events: {
                click: (event)=>{
                    event.preventDefault();
                    history.pushState({}, "", "Login")
                }
            }
        } as LinkProps);
        this.children.register = new Link({
            label: "Создать аккаунт",
            events: {
                click: (event)=>{
                    event.preventDefault();
                    history.pushState({}, "", "Register")
                }
            }
        } as LinkProps);
        this.children.chat = new Link({
            label: "Чат",
            events: {
                click: (event)=>{
                    event.preventDefault();
                    history.pushState({}, "", "Chat")
                }
            }
        } as LinkProps);
        this.children.profile = new Link({
            label: "Профиль",
            events: {
                click: (event)=>{
                    event.preventDefault();
                    history.pushState({}, "", "Profile")
                }
            }
        } as LinkProps);
        this.children.password = new Link({
            label: "Смена пароля",
            events: {
                click: ()=>{
                    history.pushState({}, "", "Password")
                }
            }
        } as LinkProps);
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
