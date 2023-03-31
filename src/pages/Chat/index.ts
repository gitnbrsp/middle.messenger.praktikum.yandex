import {Block} from "../../utils/Block";
import {indexPage} from "../../components/Link";
import {template} from "./template";
import styles from "../../components/Link/styles.css";
import {testUsers} from "../../components/UserCards";
import {testData} from "../../components/AccountData";
import {messageForm} from "../../components/MessageForm";


export class Chat extends Block {
    constructor() {
        super({}, {});
    }
    
    init() {
        this.children.userCards = testUsers;
        this.children.accountData = testData;
        this.children.indexPage = indexPage;
        this.children.messageForm = messageForm;
    }
    
    render() {
        return this.compile(template, {...this.props, styles});
    }
}
