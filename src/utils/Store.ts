import {Block} from "./Block";
import {EventBus} from "./EventBus";
import {set} from "./Utils";
import {EVENTS} from "./Constants";
import {State} from "../interfaces/state";

const initialState = {
    user: {
        user: null,
        isLoading: false,
        hasError: false,
        errorMessage: '',
    },
    chats: {
        chats: [],
        isLoading: false,
        hasError: false,
        errorMessage: '',
    },
    messages: {
        messages: [],
        isLoading: false,
        hasError: false,
        errorMessage: '',
        activeChatId: 0,
    }
} as unknown as State;

class Store extends EventBus {
    private state = initialState;

    public set(keypath: string, value: unknown) {
        //@ts-ignore
        set(this.state, keypath, value);
        this.emit(EVENTS.UPDATED, this.state);
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => {
    return (Component: typeof Block) => {
        return class WithStore extends Component {
            constructor(props: unknown) {
                const mappedState = mapStateToProps(store.getState());
                super({...<object>props, ...<object>mappedState}, {});
                store.on(EVENTS.UPDATED, (newState: any) => {
                    this.setProps(mapStateToProps(newState));
                });
            }
        }
    }
}

export { store };

export const withChats = withStore((state) => ({ ...state.chats }));
export const withUser = withStore((state) => ({ ...state.user }));
export const withMessages = withStore((state) => ({ ...state.messages }));
