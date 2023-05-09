import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {Search} from "../Search";
import userController from "../../controllers/UserController";
import chatController from "../../controllers/ChatController";
import {store} from "../../utils/Store";
import {ChatMenuProps, SearchProps} from "../../interfaces/components";

export class ChatMenu extends Block<ChatMenuProps> {
    constructor(props: ChatMenuProps) {
        super({...props}, {});
    }

    init() {
        super.init();
        this.children.search_add =  new Search({
            id: 'add_agent',
            events: {
                input: (e: Event)=>{
                    //@ts-ignore
                    userController.searchUser(e.target.value).then((res: any)=>{
                        const result: HTMLElement | null = document.querySelector('#add_agent');
                        result!.innerHTML = '';
                        res.forEach((r: any)=>{
                            const li = document.createElement('li');
                            li.innerHTML = `${r.login}`;
                            li.classList.add('search_result');
                            li.id = r.id;
                            li.addEventListener('click', ()=>{
                                chatController.addChatUsers([r.id],
                                    //@ts-ignore
                                    store.getState().messages.activeChatId)
                            })
                            result!.appendChild(li)
                        })
                    })
                }
            }
        } as unknown as SearchProps);
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
