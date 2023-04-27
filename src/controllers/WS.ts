import {EventBus} from "../utils/EventBus";
import {EVENTS} from "../utils/Constants";

export class WS extends EventBus {

    private socket: WebSocket;
    private messages: string[] | [];
    private readonly chatId: number;
    private readonly token: string;
    private readonly userId: number;

    constructor(userId, chatId, token) {
        super();

        this.socket = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
        );

        this.messages = [];

        this.chatId = chatId;
        this.userId = userId;
        this.token = token;

        this._addListeners();
        this._checkNewMessages();
    }

    private _ping() {
        setInterval(()=>{
            this.socket.send(JSON.stringify({type: "ping"}));
        }, 5000)
    }

    private _checkNewMessages() {
        setInterval(()=>{
            this._getOldMessages();
        }, 50000)
    }

    private _getOldMessages(): void {
        this.socket.send(JSON.stringify({
            content: this.messages.length.toString(),
            type: "get old"
        }));
    }

    private _addListeners(): void {

        this.socket.addEventListener('open', ()=>{
            this._ping()
            this._getOldMessages();
        })

        //todo: remove listeners on close?
        this.socket.addEventListener('close', event =>{
            console.log(this.chatId, event.wasClean ? 'closed' :  'failed');
            // console.log(`code: ${event.code} | event: ${event.reason}`);
            // store.set('messages.errorMessage', `code: ${event.code} | event: ${event.reason}`);
        })

        this.socket.addEventListener('message', event => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case "pong":
                    break;
                case "message":
                case "file":
                    this.messages = [data, ...this.messages];
                    break;
                case "error":
                    console.error('WSError:', this.chatId, data);
                    break;
                default:
                    if (data[0]?.chat_id) {
                        this.messages = [...data, ...this.messages];
                    }
                    this.emit(EVENTS.NEW_MESSAGES, this.messages, this.chatId);
                    console.log(data)
            }
        });

        this.socket.addEventListener('error', event => {
            console.error('error', event.message);
        });
    }

    public getMessages(): string[] | [] {
        return this.messages
    }

    public sendMessage(message): void {
        this.socket.send(message);
        setTimeout(()=>{
            this._getOldMessages();
        }, 2000)
    }
}
