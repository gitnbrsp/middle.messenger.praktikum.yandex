import {METHODS, URLS} from "./Constants";
type HTTPMethod = (url: string, options?: Record<string, unknown>) => Promise<unknown>;
type Options = {method: string, data?: Record<string, unknown>, headers?: Record<string, string>};

export default class HTTPTransport {

    private readonly BASE_URL = URLS.API_BASEPATH

    constructor(additionalUrl:string) {
        this.BASE_URL+=additionalUrl;
    }

    private _addParamsToUrl = (url: string, params?: any) => {

        const arr = [];
        for (const p in params) {
            arr.push(p+'='+params[p])
        }

        return  (arr.length ? url+'?'+arr.join('&') : url)
    }

    get: HTTPMethod = (url, options = {}) => {
        return this._request(
            this._addParamsToUrl(url, options.user),
    {...options, method: METHODS.GET}
        );
    };

    put: HTTPMethod = (url, options = {}) => {
        return this._request(
            url,
            {...options, method: METHODS.PUT}
        );
    };

    post: HTTPMethod = (url, options = {}) => {
        return this._request(
            url,
            {...options, method: METHODS.POST}
        );
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this._request(
            url,
            {...options, method: METHODS.DELETE}
        );
    };

    private _request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
        return new Promise((resolve, reject) => {
            const data: unknown = options.data;
            const method: string = options.method;
            const headers: Record<string, string> = options.headers!;
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
