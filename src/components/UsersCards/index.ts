import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {UsersCardsProps} from "../../interfaces/components";

export class UsersCards extends Block<UsersCardsProps> {
    constructor(props: UsersCardsProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
