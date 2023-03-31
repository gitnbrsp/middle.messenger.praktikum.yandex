"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    constructor() {
        this.listeners = {};
    }
    _checkListener(event) {
        if (!this.listeners[event]) {
            throw new Error(`No such event, "${event}"`);
        }
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        this._checkListener(event);
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }
    emit(event, ...args) {
        this._checkListener(event);
        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}
exports.EventBus = EventBus;
//# sourceMappingURL=EventBus.js.map