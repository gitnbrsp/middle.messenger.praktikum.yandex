import styles from "./styles.css";
import {Avatar} from "../Avatar";
import {template} from "./template"
import {Block} from "../../utils/Block";
import {AccountDataProps, AvatarProps} from "../../interfaces/components";

export class AccountData extends Block<AccountDataProps> {
    constructor(props: AccountDataProps) {
        super({...props}, {});
    }

    init() {
        super.init();
        this.children.avatar = new Avatar({
            width: 70,
            height: 70,
            imagePath: (this.props as Record<string, unknown>).imagePath,
        } as AvatarProps);
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
