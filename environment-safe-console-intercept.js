import { isBrowser, isJsDom } from "browser-or-node";
import * as mod from 'module';
let interceptor = null;
// todo: support more than a single text string
// for now: couple to intercept-stdout's model
export const intercept = (handler)=>{
    if(!(isBrowser || isJsDom)){
        if(!interceptor){
            const require = mod.createRequire(import.meta.url);
            const interceptStdOut = require("intercept-stdout");
            interceptor = interceptStdOut
        }
        return interceptor(handler);
    }else{
        const logger = console.log;
        console.log = (...args)=>{
            const textArg = args[0];
            const outboundText = handler(textArg+'\n');
            if(outboundText){
                args[0] = outboundText;
                logger.apply(logger, args);
            }
        }
        return ()=>{
            console.log = logger;
        }
    }
}