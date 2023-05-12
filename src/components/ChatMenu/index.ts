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
                input: (e: Record<string, unknown>)=>{
                    userController.searchUser((e.target as Record<string, string>).value)
                        .then((res: Record<string, unknown>)=>{
                        const result: HTMLElement =
                            document.querySelector('#add_agent') as HTMLElement;
                        result.innerHTML = '';
                        //@ts-ignore
                        res.forEach((r: Record<string, unknown>)=>{
                            const li = document.createElement('li');
                            li.innerHTML = `${r.login}`;
                            li.classList.add('search_result');
                            li.id = r.id as string;
                            li.addEventListener('click', ()=>{
                                //@ts-ignore
                                chatController.addChatUsers([r.id],
                                    //@ts-ignore
                                    store.getState()?.messages.activeChatId)
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
