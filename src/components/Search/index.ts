import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {SearchProps} from "../../interfaces/components";

export class Search extends Block<SearchProps> {
    constructor(props: SearchProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
