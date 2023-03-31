"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HTTPTransport {
    constructor() {
        this.addParamsToUrl = (url, params) => {
            //todo: check if non escaped spaces requred (' ' vs %20)
            // let arr = [];
            let urlWParams = new URL(url);
            for (let p in params) {
                // arr.push(p+'='+params[p])
                urlWParams.searchParams.set(p, params[p]);
            }
            return urlWParams.href; // url+'?'+arr.join('&')
        };
        this.get = (url, options = {}) => {
            console.log('get', url, options);
            return this._request(this.addParamsToUrl(url, options.data), {
                ...options,
                method: HTTPTransport.METHODS.GET
            }, options.timeout);
        };
        this.put = (url, options = {}) => {
            return this._request(url, { ...options, method: HTTPTransport.METHODS.PUT }, options.timeout);
        };
        this.post = (url, options = {}) => {
            return this._request(url, { ...options, method: HTTPTransport.METHODS.POST }, options.timeout);
        };
        this.delete = (url, options = {}) => {
            return this._request(url, { ...options, method: HTTPTransport.METHODS.DELETE }, options.timeout);
        };
        this._request = (url, options, timeout = 5000) => {
            return new Promise((resolve, reject) => {
                const data = options.data;
                const method = options.method;
                const headers = options.headers;
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                for (let h in headers) {
                    xhr.setRequestHeader(h, headers[h]);
                }
                xhr.timeout = timeout;
                xhr.onload = () => {
                    //todo: check statuscode
                    resolve(xhr);
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (method === HTTPTransport.METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(data);
                }
            });
        };
    }
}
HTTPTransport.METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};
exports.default = HTTPTransport;
//# sourceMappingURL=HTTPTransport.js.map
