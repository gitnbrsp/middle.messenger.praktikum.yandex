import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {InputProps} from "../../interfaces/components";

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
