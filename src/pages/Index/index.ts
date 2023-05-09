import styles from "./styles.css";
import {template} from "./template";

import {indexPage, Link} from "../../components/Link";

import {router} from "../../utils/Router";
import {Block} from "../../utils/Block";
import {ROUTES} from "../../utils/Constants";
import {LinkProps} from "../../interfaces/components";

export class Index extends Block {

    constructor() {
        super({}, {});
    }

    init() {

        this.children.login = new Link({
            label: "Вход",
            events: {
                click: ()=>{
                    router.go(ROUTES.Login);
                }
            }
        } as LinkProps);

        this.children.register = new Link({
            label: "Создать аккаунт",
            events: {
                click: ()=>{
                    router.go(ROUTES.Register);
                }
            }
        } as LinkProps);

        this.children.chat = new Link({
            label: "Чат",
            events: {
                click: ()=>{
                    router.go(ROUTES.Chat);
                }
            }
        } as LinkProps);

        this.children.profile = new Link({
            label: "Профиль",
            events: {
                click: ()=>{
                    router.go(ROUTES.Profile);
                }
            }
        } as LinkProps);

        this.children.password = new Link({
            label: "Смена пароля",
            events: {
                click: ()=>{
                    router.go(ROUTES.Password);
                }
            }
        } as LinkProps);

        this.children[404] = new Link({
            label: "404",
            events: {
                click: ()=>{
                    router.go(ROUTES.Error);
                }
            }
        } as LinkProps);

        this.children[500] = new Link({
            label: "500",
            events: {
                click: ()=>{
                    router.go(ROUTES.Error);
                }
            }
        } as LinkProps);

        this.children.back = indexPage;
    }


    render() {
        return this.compile(template, {...this.props, styles});
    }
}
