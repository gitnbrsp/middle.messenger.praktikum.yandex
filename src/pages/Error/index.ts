import styles from "./styles.css";
import {template} from "./template";

import router from "../../utils/Router";
import {Block} from "../../utils/Block";
import {ROUTES} from "../../utils/Constants";

import {Link} from "../../components/Link";


export class Error extends Block {
    private statusCode: string | number;
    private text: string;

    constructor(statusCode= 'Ошибка', text = 'Уже исправляем') {
        super({}, {});
        this.statusCode = statusCode;
        this.text = text;
    }

    init() {
        this.children.back = new Link({
            label: "На главную",
            events: {
                click: ()=>{
                    router.go(ROUTES.Index);
                }
            }
        } as LinkProps);
    }
    
    render() {
        return this.compile(template, {...this.props, styles});
    }
}
