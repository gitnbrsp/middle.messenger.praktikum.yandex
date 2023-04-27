import HTTPTransport from "../utils/HTTPTransport";

export default abstract class BaseAPI {

    protected http: HTTPTransport;

    protected constructor(additionalUrl: string) {
        this.http = new HTTPTransport(additionalUrl);
    }
}
