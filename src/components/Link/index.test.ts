import sinon from "sinon";
import {expect} from 'chai';
import {Link} from './index';
import {ROUTES} from "../../utils/Constants";
import {router} from "../../utils/Router";

describe('Link component', () => {

    const testProps = {
        label: "test",
        events: {
            click: ()=>{
                router.go(ROUTES.Index);
            }
        }
    };

    const link = new Link(testProps);

    it('should render Link instance', () => {
        new Link(testProps);
    });

    it('element should return link', () => {
        const element = link.element as HTMLElement;
        expect(element.tagName).eq('A')
    });

    it('should go to passed route on click', () => {
        const spy = sinon.spy(router, 'go');
        const element = link.element as HTMLSpanElement;
        element.click();
        expect(spy.calledOnce).to.be.true;
    });
});
