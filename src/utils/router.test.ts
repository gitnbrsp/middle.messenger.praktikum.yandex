import {expect} from "chai";
import {router} from "./Router";
import sinon from "sinon";
import {Block} from "./Block";

describe('Router module', () => {

    const fakeGetContent = sinon.fake.returns(document.createElement('div'));

    class FakeBlock {
        getContent() {
            return fakeGetContent()
        }
    }

    const testBlock = new FakeBlock() as unknown as Block;

    beforeEach(()=>{
        router
            .use('/a', testBlock)
            .use('/b', testBlock)
            .use('/c', testBlock);
    })

    it('use() should return instance of Router', () => {
        const result = router.use('/', testBlock);
        expect(result).eq(router);
    });

    it('go() should render page', () => {
        router.start();
        router.go('/a');
        expect(fakeGetContent.calledOnce).to.be.true;
    });

    it('back() should render page', () => {
        router.back();
        expect(fakeGetContent.calledOnce).to.be.true;
    });

    it('forward() should render page', () => {
        router.forward();
        expect(fakeGetContent.calledOnce).to.be.true;
    });

});
