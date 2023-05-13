import {expect} from 'chai';
import {handleValidation, REGEXPS, set, abbreviate} from './Utils';

describe('Utils module', () => {

    describe('set function', () => {
        const key = 'test_key';
        const value = 'value';
        let obj: Record<string, unknown>;

        beforeEach(() => {
            obj = {};
        });

        it('should set key-value', () => {
            set(obj, key, value);
            expect(obj).to.haveOwnProperty(key, value);
        });

        it('should return passed value if not an object', () => {
            const stringValue = 'value';
            const result = set(stringValue, key, value);
            expect(result).to.equal(stringValue);
        });

        it('should return original object', () => {
            const result = set(obj, key, value);
            obj['test'] = 'value';
            expect(result).to.equal(obj);
        });

        it('should throw error if path not string', () => {
            const n = undefined;
            //@ts-ignore
            const f = () => set(obj, n, value);
            expect(f).to.throw(Error);
        });
    });

    describe('abbreviate function', () => {

        it('should return original string', () => {
            const testString = 'qwe';
            const result = abbreviate(testString);
            expect(result).to.eq(testString);
        });

        it('should return shorten string', () => {
            const testString = 'qweqweqweqweqweqwe';
            const result = abbreviate(testString);
            expect(result.length).lessThan(testString.length);
        });

        it('should return stub on unexpected value', () => {
            const testString = null;
            //@ts-ignore
            const result = abbreviate(testString);
            expect(result).eq('field_empty');
        });
    });

    describe('handleValidation function', () => {

        const KEYS = Object.keys(REGEXPS);

        function createValidationStub(values: Record<string, unknown>): void {
            const testForm = global.document.createElement('form');

            testForm.setAttribute('id', 'test-form');

            Object.entries(values).forEach(([key, value])=>{
                const input = global.document.createElement('input');
                //@ts-ignore
                input.setAttribute('value', value);
                input.setAttribute('name', key);
                testForm.appendChild(input);
            })

            global.document.body.appendChild(testForm);
        }

        it('should return false on empty', () => {
            const values: Record<string, unknown> = KEYS
                //@ts-ignore
                .reduce((acc,curr)=>(acc[curr]='', acc),{})

            createValidationStub(values)
            const eventStub = {target: global.document.querySelector('#test-form')}

            //@ts-ignore
            const validationResult = handleValidation(eventStub);
            expect(validationResult).to.be.false;
        });

        it('should return false on not valid value', ()=> {

            createValidationStub({phone: 'qwe'});
            const eventStub = {target: global.document.querySelector('#test-form')}

            //@ts-ignore
            const validationResult = handleValidation(eventStub as Event);
            expect(validationResult).to.be.false;
        });
    });
});
