/* global describe : false */
import { it } from '@open-automaton/moka';
import { chai } from '@environment-safe/chai';
import { intercept } from '../src/index.mjs';
const should = chai.should();

describe('environment-safe-console-intercept', ()=>{
    describe('performs a simple test suite', ()=>{
        it('works as expected', ()=>{
            should.exist(intercept);
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
