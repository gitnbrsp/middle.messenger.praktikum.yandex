import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {abbreviate} from "../../utils/utils";

export class AccountData extends Block<AccountDataProps> {
    constructor(props: AccountDataProps) {
        super({...props}, {});
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}

export const testData = new AccountData({
    first_name: "ivan",
    email: abbreviate("ivanivanov@yandex.ru"),
    events: {
        click: (event)=>{
            console.log(event);
        }
    }
} as AccountDataProps);
