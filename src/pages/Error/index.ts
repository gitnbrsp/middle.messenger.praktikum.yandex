import styles from "./styles.css";
import {template} from "./template";

import {router} from "../../utils/Router";
import {Block} from "../../utils/Block";
import {ROUTES} from "../../utils/Constants";

import {Link} from "../../components/Link";
import {LinkProps} from "../../interfaces/components";


export class Error extends Block {
    // @ts-ignore
    private statusCode: string | number;

    constructor(statusCode= 'Ошибка') {
        super({}, {});
        // @ts-ignore
        this.statusCode = statusCode;
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
