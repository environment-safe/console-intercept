import { chai } from 'environment-safe-chai'; 
const should = chai.should();
import { intercept } from '../environment-safe-console-intercept.mjs'

describe('environment-safe-console-intercept', ()=>{
   describe('performs a simple test suite', ()=>{
        it('works as expected', ()=>{
            //test here
            let result = '';
            const terminate = intercept((text)=>{
               result += text;
               return '';
            });
            console.log('foo');
            console.log('bar');
            terminate();
            console.log('baz');
            result.should.not.equal(
               'foo\nbar\nbaz\n', 
               'intercept was not terminated'
            );
            result.should.equal('foo\nbar\n');
        });
    });
});
