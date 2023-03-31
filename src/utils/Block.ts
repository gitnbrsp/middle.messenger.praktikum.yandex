import {EventBus} from './EventBus';
import handlebars from 'handlebars';

/** Class representing a element`s lifecycle. */

export class Block<P extends Record<string, unknown> = unknown>{

    public id: string;
    public children: Record<string, Block | Block[]>;
    protected props: P | undefined;
    private _element: HTMLElement | null = null;
    private eventBus: () => EventBus;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    } as const;

    /** Class representing a lifecycle of element.
     * @param {Record<string, any>} props - listener`s key.
     * @param {Record<string, Block | Block[]>} children - listener`s key.
     * @return {void} Throw error if event not key of listeners.
     */

    constructor(props, children){
        const eventBus = new EventBus();

        this.children = children;
        this.props = new Proxy(props, {
            get(target:string, prop:string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target:string, prop:string, value) {
                const oldTarget = {...target}
                target[prop] = value;
                eventBus.emit(Block.EVENTS.FLOW_CDU, [oldTarget, target]);
                return true;
            }
        } as ProxyHandler<P>);

        this.id = this.props?.id ? this.props?.id:window.crypto.randomUUID();
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents() {
        const {events = {}} = this.props as P & {events: Record<string, (event) => void>};

        Object.keys(events).forEach(eventName => {
            this._element!.addEventListener(eventName, events[eventName]);
        });
    }

    private _registerEvents(eventBus){
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init(){
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init(){}

    private _componentDidMount(){
        this.componentDidMount();
    }

    componentDidMount(){}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => {
            child!.dispatchComponentDidMount();
        });
    }

    private _componentDidUpdate(oldProps: P, newProps: P){
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: P, newProps: P){
        return oldProps == newProps;

    }

    private _render(){
        const fragment = this.render();

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;
        this._addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    protected compile(template: string, context: any){

        const propsObj = {...context};

        Object.entries(this.children).forEach(([name, component]) => {
            propsObj[name] = `<div data-id="${component!.id}"></div>`;
        });

        const compiledTemplate = handlebars.compile(template);
        const tpl = document.createElement('template');
        tpl.innerHTML =  compiledTemplate(propsObj);

        Object.values(this.children).forEach((component) => {
            const elements = tpl.content.querySelector(`[data-id="${component.id}"]`);
            component.getContent()?.append(...Array.from(elements.childNodes));
            elements.replaceWith(component.getContent()!);
        });

        return tpl.content;
    }

    get element() {
        return this._element;
    }

    protected getContent() {
        return this.element;
    }
}
