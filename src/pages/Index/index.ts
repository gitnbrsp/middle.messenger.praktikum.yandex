import styles from "./styles.css";
import {template} from "./template";

import {indexPage, Link} from "../../components/Link";

import Router from "../../utils/Router";
import {Block} from "../../utils/Block";
import {ROUTES} from "../../utils/Constants";

export class Index extends Block {

    constructor() {
        super({}, {});
    }

    init() {

        this.children.login = new Link({
            label: "Вход",
            events: {
                click: ()=>{
                    Router.go(ROUTES.Login);
                }
            }
        } as LinkProps);

        this.children.register = new Link({
            label: "Создать аккаунт",
            events: {
                click: ()=>{
                    Router.go(ROUTES.Register);
                }
            }
        } as LinkProps);

        this.children.chat = new Link({
            label: "Чат",
            events: {
                click: ()=>{
                    Router.go(ROUTES.Chat);
                }
            }
        } as LinkProps);

        this.children.profile = new Link({
            label: "Профиль",
            events: {
                click: ()=>{
                    Router.go(ROUTES.Profile);
                }
            }
        } as LinkProps);

        this.children.password = new Link({
            label: "Смена пароля",
            events: {
                click: ()=>{
                    Router.go(ROUTES.Password);
                }
            }
        } as LinkProps);

        this.children[404] = new Link({
            label: "404",
            events: {
                click: ()=>{
                    Router.go(ROUTES.Error);
                }
            }
        } as LinkProps);

        this.children[500] = new Link({
            label: "500",
            events: {
                click: ()=>{
                    Router.go(ROUTES.Error);
                }
            }
        } as LinkProps);

        this.children.back = indexPage;
    }


    render() {
        return this.compile(template, {...this.props, styles});
    }
}
