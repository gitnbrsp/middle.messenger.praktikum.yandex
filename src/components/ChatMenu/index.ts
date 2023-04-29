import {Block} from "../../utils/Block";
import styles from "./styles.css";
import {template} from "./template"
import {Search} from "../Search";
import userController from "../../controllers/UserController";
import chatController from "../../controllers/ChatController";
import {store} from "../../utils/Store";

export class ChatMenu extends Block<ChatMenuProps> {
    constructor(props: ChatMenuProps) {
        super({...props}, {});
    }

    init() {
        super.init();
        this.children.search_add =  new Search({
            id: 'add_agent',
            events: {
                input: (e)=>{
                    userController.searchUser(e.target.value).then(res=>{
                        console.log(res)
                        const result = document.querySelector('#add_agent');
                        result.innerHTML = '';
                        res.forEach(r=>{
                            console.log(r)
                            const li = document.createElement('li');
                            li.innerHTML = `${r.login}`;
                            li.classList.add('search_result');
                            li.id = r.id;
                            li.addEventListener('click', ()=>{
                                chatController.addChatUsers(
                                    [r.id],
                                    store.getState().messages.activeChatId)
                                    .then(()=>{
                                        console.log('chat created')
                                    })
                            })
                            result.appendChild(li)
                        })
                    })
                }
            }
        } as SearchProps);
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}
