import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"

export class WarningMsg extends Block<WarningMsgProps> {
    constructor(props: WarningMsgProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
