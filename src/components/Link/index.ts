import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {router} from "../../utils/Router";
import {ROUTES} from "../../utils/Constants";
import {LinkProps} from "../../interfaces/components";

export class Link extends Block {
    constructor({...props}: LinkProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}

export const indexPage = new Link({
    label: "на главную",
    events: {
        click: ()=>{
            router.go(ROUTES.Index)
        }
    }
} as LinkProps);
