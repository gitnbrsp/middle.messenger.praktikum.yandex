import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"

export class UserCards extends Block<UserCardsProps> {
    constructor(props: UserCardsProps) {
        super({...props}, {});
    }

    randomColor() {
        const colors: string[] = [
            "#111111",
            "#999999",
            "#777777",
            "#333333",
            "#5c6b5d",
            "#000500",
            "#173b2a"];
        this.props!.color = colors[Math.floor(Math.random() * colors.length)];
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}

const templateData: Array<unknown> = [
        {
            "name": "Yoko Robbins",
            "phone": "1-528-850-1576",
            "email": "diam.at@google.couk",
            "country": "Vietnam",
            "numberrange": 10,
            "alphanumeric": "JTI18SPG2VY",
            "list": 5,
            "text": "velit egestas lacinia. Sed congue, elit sed" +
                " consequat auctor, nunc nulla vulputate dui," +
                " nec tempus mauris erat eget ipsum. Suspendisse"
        },
        {
            "name": "Ahmed Pugh",
            "phone": "1-150-933-3448",
            "email": "a@google.com",
            "country": "New Zealand",
            "numberrange": 1,
            "alphanumeric": "KMI35VCE6KK",
            "list": 7,
            "text": "tincidunt aliquam arcu. Aliquam ultrices iaculis odio." +
                " Nam interdum enim non nisi. Aenean" +
                " eget metus. In nec orci. Donec nibh."
        }
    ];

export const testUsers = new UserCards({
    users: templateData,
    events: {
        click: ()=>{
            console.log("card")
        }
    }
} as UserCardsProps);


// (new HTTPTransport()).get("/data", {})
//     .then((response) => {testUsers.setProps({users:response.response})})
