import {Block} from "../../utils/Block";
import {Link, indexPage} from "../../components/Link";
import {template} from "./template";
import styles from "../../components/Link/styles.css";
import {password} from "../../components/Input";
import {Button} from "../../components/Button";
import {handleValidation} from "../../utils/utils";


export class Password extends Block {
    constructor() {
        super({}, {});
    }

    init() {

        this.children.old_password = password;
        this.children.new_password = password;
        this.children.confirm_password = password;

        this.children.signButton = new Button({
            text: "Сохранить",
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
                    history.pushState({}, "", "Profile")
                }
            }
        } as LinkProps);

        this.children.indexPage = indexPage;
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
