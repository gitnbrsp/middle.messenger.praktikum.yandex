// @ts-nocheck
import styles from "./styles.css";
import {template} from "./template";

import {Search} from "../../components/Search";
import {Loading} from "../../components/Loading";
import {ChatMenu} from "../../components/ChatMenu";
import {Messages} from "../../components/Messages";
import {UsersCards} from "../../components/UsersCards";
import {WarningMsg} from "../../components/WarningMsg";
import {AccountData} from "../../components/AccountData";
import {MessageForm} from "../../components/MessageForm";

import {router} from "../../utils/Router";
import {Block} from "../../utils/Block";
import {abbreviate} from "../../utils/Utils";
import {store, withChats} from "../../utils/Store";
import {ROUTES, STORE, URLS} from "../../utils/Constants";

import WSController from "../../controllers/WSController";
import authController from "../../controllers/AuthController";
import chatController from "../../controllers/ChatController";
import userController from "../../controllers/UserController";

import {
    ChatMenuProps, LinkProps,
    MessageFormProps,
    SearchProps,
    UsersCardsProps
} from "../../interfaces/components";
import {Link} from "../../components/Link";


class ChatClass extends Block {
    constructor(props: Record<string, unknown>) {
        super({...props}, {});
    }

    init() {
        this.children.messages = this.renderMessages();

        this.children.messageForm =  new MessageForm({
            events: {
                keydown: (event)=>{
                    handleEnterSubmit(event);
                },
                submit: (event)=>{
                    event.preventDefault();
                    const formData = Object.fromEntries(new FormData(event.target));

                    const fd = new FormData();
                    fd.append('resource', formData.attached_file);

                    if (formData?.attached_file.size) {
                        WSController.sendMessage({type: 'file', content: fd})
                    } else {
                        WSController.sendMessage({type: 'message', content: formData.message})
                    }

                    event.target.reset();
                }
            }
        } as MessageFormProps);

        this.children.search =  new Search({
            id: 'search_result',
            events: {
                input: (e)=>{
                    userController.searchUser(e.target.value).then(res=>{
                        const result = document.querySelector('#search_result');
                        result.innerHTML = '';
                        res.forEach(r=>{
                            const li = document.createElement('li');
                            li.innerHTML = `${r.login}`;
                            li.classList.add('search_result');
                            li.id = r.id;
                            li.addEventListener('click', ()=>{
                                chatController.createChat(r.login).then((res)=>{
                                    chatController.addChatUsers([r.id], res.id).then(()=>{
                                        chatController.fetchChats();
                                    })
                                })
                            })
                            result.appendChild(li)
                        })
                    })
                }
            }
        } as SearchProps);
        this.children.addChat =  new Link({
            label: 'Add new chat',
            events: {
                click: ()=> {
                    const result = prompt('Enter new chat name', 'New chat');
                    if (result !== null) {
                        chatController.createChat(result).then(()=>{
                            chatController.fetchChats();
                        })
                    }
                }
            }
        } as LinkProps);

        this.children.chatMenu =  new ChatMenu({
            title: '',
            chatUsers: [1,2,3],
            events: {
                click: (event)=>{
                    const state = store.getState().messages;
                    switch (event.target.title) {
                        case 'delete chat': {
                            deleteChat(state.activeChatId);
                            break;
                        }

                        case 'add user': {
                            document.querySelector('#add_user_modal')
                                .style.visibility = "visible";
                            break;
                        }

                        case 'remove user': {
                            const users_ul = document.querySelector('#users_to_remove');
                            users_ul.innerHTML = '';
                            chatController.getChatUsers(state.activeChatId).then(res=>{
                                res.response.forEach(u=>{
                                    const li = document.createElement('li');
                                    li.title = 'remove';
                                    li.id = u.id;
                                    li.innerText = u.login;
                                    users_ul.appendChild(li);
                                })
                            })
                            const remove = document.querySelector('#remove_user_modal')
                            remove.style.visibility = "visible";
                            break;
                        }

                        case 'close chat': {
                            store.set('messages.messages', []);
                            store.set('messages.activeChatId', 0);
                            break;
                        }

                        case 'info': {
                            getInfo(state.activeChatId);
                            break;
                        }

                        case 'remove': {
                            chatController.deleteChatUser([event.target.id],state.activeChatId)
                                .then(()=>{
                                    event.target.remove();
                                    chatController.fetchChats();
                                });
                            break;

                        }
                    }
                }
            }
        } as ChatMenuProps);

        this.children.usersCards = this.renderUsersCards();
        this.children.accountData = this.renderAccountData();
        this.children.errorMessage = this.renderWarning();
    }

    protected componentDidUpdate() {
        this.children.messages = this.renderMessages();
        this.children.errorMessage = this.renderWarning();
        this.children.usersCards = this.renderUsersCards();
        this.children.accountData = this.renderAccountData();
        return true;
    }

    private renderUsersCards():  UsersCards | Loading {

        const state = store.getState();

        if (state.chats.isLoading) {
            return new Loading({
                height: '50%',
            });
        }
        else {
            state.chats.chats.forEach(chat=>{
                if (store.getState().messages.activeChatId == chat.id) {
                    chat.selected = 'selected';
                } else {
                    chat.selected = '';
                }

                if (chat.avatar) {
                    chat.imagePath = URLS.RESOURCES + chat.avatar;
                }

                if (chat.last_message?.content) {
                    chat.lastMessage = abbreviate(
                        `${chat.last_message.user.display_name}: ${chat.last_message.content}`
                    );
                } else {
                    chat.lastMessage = '---No messages yet---';
                }
            })
            return new UsersCards({
                chats: state.chats.chats,
                events: {
                    click: (e) => {
                        clickUserCardPopup(e);
                        this.selectChat(e);
                    },
                    contextmenu: (e) => {
                        e.preventDefault();
                        toggleUserCardPopup(e);
                    },
                }
            } as UsersCardsProps);
        }
    }

    private renderMessages(): WarningMsg | Loading | Messages | [] {

        const state = store.getState();
        if (state.messages?.isLoading && !state.messages.messages?.length) {
            return new Loading({height: '50%'});
        }
        else {
            if (state.messages?.messages?.length){
                state.messages.messages.forEach(msg=>{
                    if (state.user.user?.id == msg.user_id) {
                        msg.author = true;
                    }
                    //todo handle content type
                    if (msg.type === 'file') {
                        msg.isFile = true;
                        msg.link = URLS.RESOURCES+msg.file.path;
                    }
                    //todo parse datetime
                    if (msg.time.length > 11) {
                        msg.time = msg.time.substring(5,16);
                    }
                })
                return new Messages({
                    messages: state.messages.messages
                } as MessagesProps)
            } else {
                return new WarningMsg({
                    text: 'Нет сообщений'
                } as WarningMsgProps)
                // return indexPage
            }
        }
    }

    private renderAccountData(): AccountData | Loading  {

        const state = store.getState().user;

        if (state.isLoading) {
            return new Loading({
                height: '10%',
            });
        }
        else {
            return new AccountData({
                display_name: abbreviate(state.user?.display_name),
                email: abbreviate(state.user?.email),

                imagePath: state.user?.avatar ? URLS.RESOURCES+state.user?.avatar : false,

                events: {
                    click: (e)=>{
                        switch (e.target.id) {
                            case 'logout':
                                authController.logout();
                                break;
                            case 'edit':
                                router.go(ROUTES.Profile);
                                break;
                            default:
                                e.preventDefault();
                        }
                    }
                }
            } as AccountDataProps);
        }
    }

    private renderWarning(): WarningMsg {

        const state = store.getState();

        return new WarningMsg({
            text: state.chats.errorMessage ? state.chats.errorMessage : state.user.errorMessage
        } as WarningMsgProps)
    }

    private selectChat(event:Event): void {
        if (event.target.tagName !== 'SPAN') {
            const state = store.getState();
            const li = event.target.closest('li');
            if (li) {
                if (li.classList.contains('selected')) {
                    li.classList.remove("selected");
                    store.set(STORE.MESSAGES, []);
                    store.set(STORE.ACTIVE_CHAT, 0);
                } else {
                    WSController.checkWS(li.id, state.user.user.id).then(()=>{
                        this.renderMessages();
                    });
                }
            }
        }
    }

    render() {
        return this.compile(template, {...this.props, styles});
    }
}

function toggleUserCardPopup(event:Event): void {
    //todo: check closest polifill
    const popup = event.target.closest('li').firstElementChild.lastElementChild;
    if (popup) {
        const pcl = popup.classList;
        pcl.contains('show') ?  pcl.remove("show") : pcl.add('show');
    }
}

function handleEnterSubmit(event): void {
    if (event.which === 13 && !event.shiftKey) {
        if (!event.repeat && event.target.value) {
            const newEvent = new Event("submit", {cancelable: true});
            event.target.form.dispatchEvent(newEvent);
        }
        event.preventDefault();
    }
}

function clickUserCardPopup(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const target = event.target;
    const li = target.closest('li');

    switch (target.innerText) {
        case 'delete':
            deleteChat(li.id);
            break;
        case 'info':
            getInfo(li.id);
            break;
        case 'image': {
            const tempImageFormData = new FormData();
            const pictureInput = document.createElement('input');
            pictureInput.type = 'file';
            pictureInput.click();

            pictureInput.addEventListener('change', ()=>{
                tempImageFormData.append('avatar', pictureInput.files[0]);
                tempImageFormData.append('chatId', li.id);
                chatController.updateChatAvatar(tempImageFormData).then(()=>{
                    chatController.fetchChats();
                })
            })

            break;
        }
    }
}

function deleteChat(id) {
    const isConfirmed = confirm('Delete chat?');
    if (isConfirmed) {
        if (id) {
            chatController.deleteChat(id);
        }
    }
}

//todo modal
function getInfo(id) {
    chatController.getChatUsers(id).then(res=>{
        alert(JSON.stringify(res.response, null, 2))
    });
}

export const Chat = withChats(ChatClass);
