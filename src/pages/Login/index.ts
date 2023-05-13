import styles from "./styles.css";
import {template} from "./template";

import {indexPage, Link} from "../../components/Link";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";

import {Block} from "../../utils/Block";
import {router} from "../../utils/Router";
import {ROUTES} from "../../utils/Constants";
import {store, withUser} from "../../utils/Store";
import {handleValidation} from "../../utils/Utils";

import authController from "../../controllers/AuthController";
import {ButtonProps, InputProps, LinkProps} from "../../interfaces/components";
import {SignupData} from "../../interfaces/api";


export class LoginClass extends Block {
    constructor() {
        super({}, {});
    }

    init() {
        this.children.login = new Input({
            placeholder: "Логин",
            name: "login",
            type: "text"
        } as InputProps);

        this.children.password = new Input({
            placeholder: "Пароль",
            name: "password",
            type: "password"
        } as InputProps);

        this.children.signButton = new Button({
            text: "Войти",
            name: "signButton",
            disabled: false,
            events: {
                click: (e: Event) => {
                    this.submit(e);
                }
            }
        } as ButtonProps);

        this.children.createAccount = new Link({
            label: "Создать аккаунт",
            events: {
                click: ()=>{
                    router.go(ROUTES.Register);
                }
            }
        } as LinkProps);

        this.children.indexPage = indexPage;
        // this.children.warning = this.renderWarning();
    }

    protected componentDidUpdate(): boolean {
        // this.children.warning = this.renderWarning();
        return true;
    }

    // private renderWarning(): WarningMsg {
    //     const state = store.getState().user;
    //     const text = state.isLoading ? '' : state.errorMessage ? state.errorMessage : '';
    //     return new WarningMsg({
    //         text: text
    //     } as WarningMsgProps)
    // }

    submit(e: Event) {
        e.preventDefault();
        const data = handleValidation(e) as unknown as SignupData;

        // If state has user - signin without request
        if (store.getState().user.user) {
            router.go(ROUTES.Chat);
        } else {
            // If form data valid - signin
            data ? authController.signin(data).then().catch(e=>console.error(e)) : false
        }
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}

export const Login = withUser(LoginClass);

