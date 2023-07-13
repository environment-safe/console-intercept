const { chai } = require('@environment-safe/chai'); 
const should = chai.should();
const { intercept } = require('../dist/index.cjs');

describe('environment-safe-console-intercept', ()=>{
   describe('performs a simple test suite', ()=>{
        it('works as expected', ()=>{
            let result = '';
            const terminate = intercept((text)=>{
               result += text;
               return '';
            });
            console.log('foo');
            console.log('bar');
            terminate();
            const done = intercept((text)=>{
               return '';
            });
            console.log('baz');
            result.should.not.equal(
               'foo\nbar\nbaz\n', 
               'intercept was not terminated'
            );
            result.should.equal('foo\nbar\n');
            done();
        });
    });
});
