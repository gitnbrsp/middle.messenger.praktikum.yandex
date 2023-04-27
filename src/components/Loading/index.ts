import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"

export class Loading extends Block<LoadingProps> {
    constructor(props: LoadingProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
