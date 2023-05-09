import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {AvatarProps} from "../../interfaces/components";

export class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
