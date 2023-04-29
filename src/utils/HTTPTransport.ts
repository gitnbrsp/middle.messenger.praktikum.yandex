import {METHODS, URLS} from "./Constants";

export default class HTTPTransport {

    private readonly BASE_URL = URLS.API_BASEPATH

    constructor(additionalUrl:string) {
        this.BASE_URL+=additionalUrl;
    }

    private _addParamsToUrl = (url:string, params:Record<string, string>) => {
        //todo: check if non escaped spaces requred (' ' vs %20)

        const arr = [];
        // const urlWParams:URL = new URL(url);

        for (const p in params) {
            arr.push(p+'='+params[p])
            // urlWParams.searchParams.set(p, params[p]);
        }

        return  (arr.length ? url+'?'+arr.join('&') : url) //urlWParams.href
    }

    get = (url:string, options:Record<string, any> = {}) => {
        return this._request(this._addParamsToUrl(url, options.user),
    {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url:string, options:object = {}) => {
        return this._request(
            url,
            {...options, method: METHODS.PUT},
            options.timeout
        );
    };

    post = (url:string, options:object = {}) => {
        return this._request(
            url,
            {...options, method: METHODS.POST},
            options.timeout
        );
    };

    delete = (url:string, options:object = {}) => {
        return this._request(
            url,
            {...options, method: METHODS.DELETE},
            options.timeout
        );
    };

    private _request = (url:string, options:object, timeout = 5000):Promise<unknown> => {
        return new Promise((resolve, reject) => {
            const data:unknown = options.data;
            const method:string = options.method;
            const headers:Record<string, string> = options.headers;
            const xhr = new XMLHttpRequest();

            url = this.BASE_URL + url;

            xhr.open(method, url);

            for (const h in headers) {
                xhr.setRequestHeader(h, headers[h]);
            }

            xhr.timeout = timeout;

            xhr.onload=()=>{
                resolve(xhr);
            }

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.responseType = 'json';
            xhr.withCredentials = true;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as Document);
            }
        });
    };
}
