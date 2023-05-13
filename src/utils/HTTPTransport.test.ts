import sinon, {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from 'sinon';
import HTTPTransport from './HTTPTransport';
import {expect} from 'chai';
import {METHODS} from "./Constants";

describe('HTTPTransport module', () => {

    let XHR: SinonFakeXMLHttpRequestStatic;
    let API: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        XHR = sinon.useFakeXMLHttpRequest();
        XHR.onCreate = ((request: SinonFakeXMLHttpRequest) => {requests.push(request);});
        API = new HTTPTransport('/test');
    });

    it('.get() should send request', () => {
        API.get('/test');
        const req = requests.pop();
        if (req) {
            expect(req.method).eq(METHODS.GET);
        }
    });

    it('.put() should send request', () => {
        API.put('/test');
        const req = requests.pop();
        if (req) {
            expect(req.method).eq(METHODS.PUT);
        }
    });

    it('.post() should send request', () => {
        API.post('/test');
        const req = requests.pop();
        if (req) {
            expect(req.method).eq(METHODS.POST);
        }
    });

    it('.delete() should send request', () => {
        API.delete('/test');
        const req = requests.pop();
        if (req) {
            expect(req.method).eq(METHODS.DELETE);
        }
    });
});
