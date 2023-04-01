import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"

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
        click: (event)=>{
            event.preventDefault();
            history.pushState({}, "", "Index");
        }
    }
} as LinkProps);
