/** Class representing a publish-subscribe model. Only one instance allowed */

export class EventBus {
    private readonly listeners: Record<string, Array<() => void>> = {};

    /**
     * Check if event key in listeners.
     * @param {string} event - listener`s key.
     * @return {void} Throw error if event not key of listeners.
     */

    private _checkListener(event: string) {
        if (!this.listeners[event]){
            throw new Error(`No such event, ${event}`);
        }
    }

    /**
     * Add listener.
     * @param {string} event - listener`s key.
     * @param {(null | event)=>void} callback - listener`s function.
     * @return {void} Add listener.
     */

    public on(event: string, callback: any) {

        if (!this.listeners[event]){
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    /**
     * Remove listener.
     * @param {string} event - listener`s key.
     * @param {(null | event)=>void} callback - listener`s callback.
     * @return {void} Remove listener.
     */

    public off(event: string, callback: any) {
        this._checkListener(event);

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    /**
     * Emit event.
     * @param {string} event - listener`s key.
     * @param {any[] | null} args - event params.
     * @return {void} Do listener`s callback.
     */
    //@ts-ignore
    public emit(event: string, ...args){
        this._checkListener(event);

        this.listeners[event].forEach(listener=>{
            //@ts-ignore
            listener(...args);
        })
    }
}
