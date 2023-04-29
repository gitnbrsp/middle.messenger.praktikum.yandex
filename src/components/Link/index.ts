import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import Router from "../../utils/Router";
import {ROUTES} from "../../utils/Constants";

export class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
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
            Router.go(ROUTES.Index)
        }
    }
} as LinkProps);
