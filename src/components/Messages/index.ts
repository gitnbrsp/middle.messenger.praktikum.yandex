import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {MessagesProps} from "../../interfaces/components";

export class Messages extends Block<MessagesProps> {
    constructor(props: MessagesProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
