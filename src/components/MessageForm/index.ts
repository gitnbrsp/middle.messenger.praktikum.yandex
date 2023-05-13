import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {MessageFormProps} from "../../interfaces/components";

export class MessageForm extends Block<MessageFormProps> {
    constructor(props: MessageFormProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
