import {EventBus} from './EventBus';
//@ts-ignore
import handlebars from 'handlebars/dist/cjs/handlebars.js';
import {EVENTS} from "./Constants";

/** Class representing a element`s lifecycle. */

export class Block<P extends Record<string, any> = any> {

    public id: string;
    protected props: object;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    public children: Record<string, Block | Block[]>;

    /** Class representing a lifecycle of element.
     * @param {Record<string, any>} props.
     * @param {Record<string, Block | Block[]>} children.
     * @return {void}.
     */

    constructor(props: P, children: Record<string, Block | Block[]>){
        const eventBus = new EventBus();

        this.children = children;
        this.props = new Proxy(props, {
            get(target: any, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: any, prop: string, value: any) {
                const oldTarget = {...target};
                target[prop as keyof P] = value;
                eventBus.emit(EVENTS.FLOW_CDU, [oldTarget, target]);
                return true;
            }
        } as unknown as ProxyHandler<P>);

        this.id = props.id ? props.id : window.crypto.randomUUID();
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(EVENTS.INIT);
    }

    private _addEvents() {
        const {events = {}} = this.props as P & {events: Record<string, () => void>};
        Object.keys(events).forEach(eventName => {
            //@ts-ignore
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents() {
        if (this._element){
            const {events = {}} = this.props as P & {events: Record<string, () => void>};
            Object.keys(events).forEach(eventName => {
                //@ts-ignore
                this._element.removeEventListener(eventName, events[eventName]);
            });
        }
    }

    private _registerEvents(eventBus: EventBus){
        eventBus.on(EVENTS.INIT, this._init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init(){
        this.init();
        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }

    init(){}

    private _componentDidMount(){
        this.componentDidMount();
    }

    componentDidMount(){}

    public dispatchComponentDidMount() {
        this.eventBus().emit(EVENTS.FLOW_CDM);
        Object.values(this.children).forEach(child => {
            (child as Block).dispatchComponentDidMount();
        });
    }

    private _componentDidUpdate(oldProps: P, newProps: P){
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: P, newProps: P){
        return oldProps == newProps;
    }

    private _render(){
        const fragment = this.render();

        this._removeEvents();

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
            if (component){
                //@ts-ignore
                propsObj[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const compiledTemplate = handlebars.compile(template);
        const tpl = document.createElement('template');
        tpl.innerHTML =  compiledTemplate(propsObj);
        Object.values(this.children).forEach((component) => {
            if (component){
                //@ts-ignore
                const elements: HTMLElement = tpl.content.querySelector(
                    //@ts-ignore
                    `[data-id="${component.id}"]`);
                //@ts-ignore
                component.getContent().append(...Array.from(elements.childNodes));
                //@ts-ignore
                elements.replaceWith(component.getContent());
            }
        });

        return tpl.content;
    }

    setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    getContent() {
        return this.element;
    }
}
