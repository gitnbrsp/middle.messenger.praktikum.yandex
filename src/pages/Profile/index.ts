import {template} from "./template";
import styles from "./styles.css";

import {Link} from "../../components/Link";
import {Input} from "../../components/Input";
import {Avatar} from "../../components/Avatar";
import {Button} from "../../components/Button";

import {Block} from "../../utils/Block";
import Router from "../../utils/Router";
import {store, withUser} from "../../utils/Store";
import {ROUTES, URLS} from "../../utils/Constants";
import {handleValidation} from "../../utils/Utils";

import userController from "../../controllers/UserController";
import authController from "../../controllers/AuthController";


export class ProfileClass extends Block {
    constructor() {
        super({}, {});
    }

    init() {
        this.updateUser();
        this.children.signButton = new Button({
            text: "Сохранить изменения",
            name: "signButton",
            disabled: false,
            events: {
                click: (e) => {
                    e.preventDefault();
                    const data = handleValidation(e);
                    if (data) {
                        userController.updateProfile(data as User).then(res=>{
                            console.log(res);
                            authController.fetchUser();
                        })
                    }
                }
            }
        } as ButtonProps);
        this.children.changePassword = new Link({
            label: "Смена пароля",
            events: {
                click: ()=>{
                    Router.go(ROUTES.Password);
                }
            }
        } as LinkProps);
        this.children.back = new Link({
            label: "назад",
            events: {
                click: ()=>{
                    Router.back();
                }
            }
        } as LinkProps);
    }

    private updateUser(): void {
        const state = store.getState().user.user

        this.children.first_name = new Input({
            placeholder: state?.first_name ? state.first_name : "Имя",
            value: state?.first_name ? state.first_name : "",
            name: "first_name",
            type: "text"
        } as InputProps);

        this.children.second_name = new Input({
            placeholder: state?.second_name ? state.second_name : "Фамилия",
            value: state?.second_name ? state.second_name : "",
            name: "second_name",
            type: "text"
        } as InputProps);

        this.children.display_name = new Input({
            placeholder: state?.display_name ? state.display_name : "Имя в чате",
            value: state?.display_name ? state.display_name : "",
            name: "display_name",
            type: "text",
        } as InputProps);

        this.children.login = new Input({
            placeholder: state?.login ? state.login : "Логин",
            value: state?.login ? state.login : "",
            name: "login",
            type: "text"
        } as InputProps);

        this.children.email = new Input({
            placeholder: state?.email ? state.email : "Почта",
            value: state?.email ? state.email : "",
            name: "email",
            type: "text"
        } as InputProps);

        this.children.phone = new Input({
            placeholder: state?.phone ? state.phone : "Телефон",
            value: state?.phone ? state.phone : "",
            name: "phone",
            type: "text"
        } as InputProps);

        this.children.avatar = new Avatar({
            width: 70,
            height: 70,
            imagePath: state?.avatar ? URLS.RESOURCES+state.avatar : URLS.DEFAULT_AVATAR,
            events: {
                click: (e)=>{
                    console.log(e)
                },
                change: (e)=>{
                    const fd = new FormData();
                    fd.append('avatar', e.target.files[0]);
                    userController.updateProfileAvatar(fd).then(res=>{
                        console.log(res);
                        authController.fetchUser();
                    })
                }
            }
        } as AvatarProps);
    }

    protected componentDidUpdate() {
        this.updateUser();
        return true
    }



    render() {
        return this.compile(template, {...this.props, styles});
    }
}

export const Profile = withUser(ProfileClass);
