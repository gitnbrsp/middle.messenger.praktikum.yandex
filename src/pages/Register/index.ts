import styles from "./styles.css";
import {template} from "./template";

import {Block} from "../../utils/Block";
import {router} from "../../utils/Router";
import {ROUTES} from "../../utils/Constants";
import {handleValidation} from "../../utils/Utils";

import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {Link, indexPage} from "../../components/Link";

import authController from "../../controllers/AuthController";
import {ButtonProps, InputProps, LinkProps} from "../../interfaces/components";
import {SignupData} from "../../interfaces/api";


export class Register extends Block {
    constructor() {
        super({}, {});
    }

    init() {

        this.children.first_name = new Input({
            placeholder: "Имя",
            name: "first_name",
            type: "text"
        } as InputProps);

        this.children.second_name = new Input({
            placeholder: "Фамилия",
            name: "second_name",
            type: "text"
        } as InputProps);

        this.children.login = new Input({
            placeholder: "Логин",
            name: "login",
            type: "text"
        } as InputProps);

        this.children.email = new Input({
            placeholder: "Почта",
            name: "email",
            type: "text"
        } as InputProps);

        this.children.phone = new Input({
            placeholder: "Телефон",
            name: "phone",
            type: "text"
        } as InputProps);

        this.children.password = new Input({
            placeholder: "Пароль",
            name: "password",
            type: "password"
        } as InputProps);

        this.children.signButton = new Button({
            text: "Создать аккаунт",
            name: "signButton",
            disabled: false,
            events: {
                click: (e: Event) => {
                    this.submit(e);
                }
            }
        } as ButtonProps);

        this.children.back = new Link({
            label: "назад",
            events: {
                click: ()=>{
                    router.back();
                }
            }
        } as LinkProps);

        this.children.indexPage = indexPage;
    }

    submit(e: Event) {
        const data = handleValidation(e);
        if (data){
            authController.signup(data as unknown as SignupData)
                .then(()=> router.go(ROUTES.Login))
                .catch(e=>console.error(e));
        }
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}

