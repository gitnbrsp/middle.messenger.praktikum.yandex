import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"

export class MessageForm extends Block<MessageFormProps> {
    constructor(props: MessageFormProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}


export const messageForm = new MessageForm({
    events: {
        submit: (event)=>{
            event.preventDefault();
            const form:HTMLFormElement = event.target;
            console.log(Object.fromEntries(new FormData(form)));
        }
    }
} as MessageFormProps);
