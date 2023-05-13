import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {UserCardProps} from "../../interfaces/components";

export class UserCard extends Block<UserCardProps> {
    constructor(props: UserCardProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
