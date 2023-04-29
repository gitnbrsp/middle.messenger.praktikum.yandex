import {template} from "./template";
import styles from "./styles.css";

import {Block} from "../../utils/Block";
import router from "../../utils/Router";
import {ROUTES} from "../../utils/Constants";
import {handleValidation} from "../../utils/Utils";

import {Link} from "../../components/Link";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import userController from "../../controllers/UserController";
import authController from "../../controllers/AuthController";


export class Password extends Block {
    constructor() {
        super({}, {});
    }

    init() {
        this.children.password = new Input({
            placeholder: "Пароль",
            name: "oldPassword",
            type: "password"
        } as InputProps);

        this.children.newPassword = new Input({
            placeholder: "Новый пароль",
            name: "newPassword",
            type: "password"
        } as InputProps);

        // this.children.confirmPassword =  new Input({
        //     placeholder: "Подтвердите пароль",
        //     name: "confirmPassword",
        //     type: "password"
        // } as InputProps);

        this.children.signButton = new Button({
            text: "Сохранить",
            name: "signButton",
            disabled: false,
            events: {
                click: (e) => {
                    e.preventDefault();
                    const data = handleValidation(e);
                    if (data) {
                        userController.updatePassword(data).then(res=>{
                            console.log(res);
                            authController.fetchUser();
                            router.back();
                        })
                    }
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

        this.children.indexPage = new Link({
            label: "на главную",
            events: {
                click: ()=>{
                    router.go(ROUTES.Index);
                }
            }
        } as LinkProps);
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
