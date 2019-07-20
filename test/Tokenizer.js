import { XpathTokenizer } from '../src/Tokenizer/XpathTokenizer';

const XPATH_TEST =  `.//div/some-custom-element[@tori='test-2+'][contains('12',   'e-43'  )  ]/parent::/textarea/another-ele-with-dashes`;

describe('tokenizer', function() {
    it('should generate tokens', function() {
        const tokenizer = new XpathTokenizer(XPATH_TEST);
        let token = tokenizer.next();
        expect(token.rule).to.be.equal('.');
        expect(token.value).to.be.equal('current');
        token = tokenizer.next();
        expect(token.rule).to.be.equal('//');
        expect(token.value).to.be.equal('down-recursive');
        token = tokenizer.next();
        expect(token.rule).to.be.undefined
        expect(token.value).to.be.equal('div');
        token = tokenizer.next();
        expect(token.rule).to.be.equal('/');
        expect(token.value).to.be.equal('down');
        token = tokenizer.next();
        expect(token.rule).to.be.undefined
        expect(token.value).to.be.equal('some-custom-element');
        token = tokenizer.next();
        expect(token.rule).to.be.equal('[');
        expect(token.value).to.be.equal('filter-open');
        token = tokenizer.next();
        expect(token.rule).to.be.equal('@');
        expect(token.value).to.be.equal('attribute');
        token = tokenizer.next();
        expect(token.rule).to.be.undefined
        expect(token.value).to.be.equal('tori');
        token = tokenizer.next();
        expect(token.rule).to.be.equal('=');
        expect(token.value).to.be.equal('equal');
        token = tokenizer.next();
        expect(token.rule).to.be.undefined;
        expect(token.value).to.be.equal(`'test-2+'`);
        token = tokenizer.next();
        expect(token.rule).to.be.equal(']');
        expect(token.value).to.be.equal('filter-close');

        token = tokenizer.next();
        expect(token.rule).to.be.equal('[');
        expect(token.value).to.be.equal('filter-open');
        token = tokenizer.next();
        expect(token.rule).to.be.equal('contains(');
        expect(token.value).to.be.equal('contains-open');
        token = tokenizer.next();
        expect(token.rule).to.be.undefined;
        expect(token.value).to.be.equal(`'12'`);
        token = tokenizer.next();
        expect(token.rule).to.be.equal(',');
        expect(token.value).to.be.equal(`comma`);
        token = tokenizer.next();
        expect(token.rule).to.be.undefined;
        expect(token.value).to.be.equal(`'e-43'`);
        token = tokenizer.next();
        expect(token.rule).to.be.equal(`)`);
        expect(token.value).to.be.equal(`close`);
        token = tokenizer.next();
        expect(token.rule).to.be.equal(']');
        expect(token.value).to.be.equal('filter-close');

        expect(tokenizer.hasNext()).to.be.true;
        token = tokenizer.next();
        expect(token.rule).to.be.equal('/parent::');
        expect(token.value).to.be.equal('parent');
        token = tokenizer.next();
        expect(token.rule).to.be.equal('/');
        expect(token.value).to.be.equal('down');
        token = tokenizer.next();
        expect(token.rule).to.be.undefined;
        expect(token.value).to.be.equal('textarea');
        token = tokenizer.next();
        expect(token.rule).to.be.equal('/');
        expect(token.value).to.be.equal('down');
        token = tokenizer.next();
        expect(token.rule).to.be.undefined;
        expect(token.value).to.be.equal('another-ele-with-dashes');

        //end
        token = tokenizer.next();
        expect(token.rule).to.be.undefined;
        expect(token.value).to.be.equal('eof');
        expect(tokenizer.hasNext()).to.be.false;
    });
});