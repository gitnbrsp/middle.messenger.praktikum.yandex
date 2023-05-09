import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {ButtonProps} from "../../interfaces/components";

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
