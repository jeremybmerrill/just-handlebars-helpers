import {compile} from 'handlebars';

describe('formatters', () => {

    describe('currency', () => {
        it('should return USD currency for USD code after compilation', () => {
            let template = compile('{{currency 1000000 code="USD"}}');

            expect(template()).toEqual('$1,000,000.00');
        });

        it('should return USD currency with zero precision for USD code and zero precision after compilation', () => {
            let template = compile('{{currency 1000000.125 code="USD" precision=0}}');

            expect(template()).toEqual('$1,000,000');
        });

        it('should return USD currency with precision = 2 for currency with decimal values after compilation', () => {
            let template = compile('{{currency 1000000.435 code="USD"}}');

            expect(template()).toEqual('$1,000,000.44');
        });

        it('should return value in thousands format for no country code after compilation', () => {
            let template = compile('{{currency 1000000}}');

            expect(template()).toEqual('1,000,000.00');
        });

        it('should return value in thousands format for invalid country code after compilation', () => {
            let template = compile('{{currency 1000000 code="ZZZ"}}');

            expect(template()).toEqual('1,000,000.00');
        });

        it('should return 0.00 for invalid currency value without country code after compilation', () => {
            let template = compile('{{currency "asd"}}');

            expect(template()).toEqual('0.00');
        });

        it('should return USD 0.00 for invalid currency value with USD code after compilation', () => {
            let template = compile('{{currency "asdf" code="USD"}}');

            expect(template()).toEqual('$0.00');
        });

        it('should return 0.00 for invalid currency value with invalid country code after compilation', () => {
            let template = compile('{{currency "asd" code="ZZZ"}}');

            expect(template()).toEqual('0.00');
        });

        it('should return 0.00 for no currency value after compilation', () => {
            let template = compile('{{currency}}');

            expect(template()).toEqual('0.00');
        });

        it('should return EUR currency value for EUR code after compilation', () => {
            let template = compile('{{currency 1000000 code="EUR"}}');

            expect(template()).toEqual('1 000 000,00 €');
        });

        it('should return EUR currency value with symbol on left for EUR code after compilation', () => {
            let template = compile('{{currency 1000000 code="EUR" format="%s %v"}}');

            expect(template()).toEqual('€ 1 000 000,00');
        });

        it('should return EUR currency value with "," as thousand separator and "." as decimal separator for EUR code after compilation', () => {
            let template = compile('{{currency 1000000.25 code="EUR" thousand="," decimal="."}}');

            expect(template()).toEqual('1,000,000.25 €');
        });
    });
});