export default class HTTPTransport {
    static METHODS = {
        GET: 'GET',
        PUT: 'PUT',
        POST: 'POST',
        DELETE: 'DELETE',
    } as const;

    private _addParamsToUrl = (url:string, params:Record<string, string>) => {
        //todo: check if non escaped spaces requred (' ' vs %20)

        const arr = [];
        // const urlWParams:URL = new URL(url);

        for (const p in params) {
            arr.push(p+'='+params[p])
            // urlWParams.searchParams.set(p, params[p]);
        }

        return  url+'?'+arr.join('&') //urlWParams.href
    }

    get = (url:string, options:Record<string, any>) => {
        return this._request(this._addParamsToUrl(url, options.data),
    {...options, method: HTTPTransport.METHODS.GET}, options.timeout);
    };

    put = (url:string, options:object = {}) => {
        return this._request(
            url,
            {...options, method: HTTPTransport.METHODS.PUT},
            options.timeout
        );
    };

    post = (url:string, options:object = {}) => {
        return this._request(
            url,
            {...options, method: HTTPTransport.METHODS.POST},
            options.timeout
        );
    };

    delete = (url:string, options:object = {}) => {
        return this._request(
            url,
            {...options, method: HTTPTransport.METHODS.DELETE},
            options.timeout
        );
    };

    private _request = (url:string, options:object, timeout = 5000):Promise<unknown> => {
        return new Promise((resolve, reject) => {
            const data:unknown = options.data;
            const method:string = options.method;
            const headers:Record<string, string> = options.headers;
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            for (const h in headers) {
                xhr.setRequestHeader(h, headers[h]);
            }

            xhr.timeout = timeout;
            xhr.onload = ()=>{
                //todo: check statuscode
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === HTTPTransport.METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
