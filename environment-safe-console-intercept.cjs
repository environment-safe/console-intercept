const { isBrowser, isJsDom } = require('browser-or-node');
const mod = require('module');
let interceptor = null;
// todo: support more than a single text string
// for now: couple to intercept-stdout's model
export const intercept = (handler)=>{
    if(!(isBrowser || isJsDom)){
        if(!interceptor){
            interceptor = require("intercept-stdout");
        }
        return interceptor(handler);
    }else{
        const logger = console.log;
        const err = console.error;
        const warn = console.warn;
        console.log = (...args)=>{
            const textArg = args[0];
            const outboundText = handler(textArg+'\n');
            if(outboundText){
                args[0] = outboundText;
                logger.apply(logger, args);
            }
        }
        console.error = (...args)=>{
            const textArg = args[0].message?args[0].message:args[0];
            const outboundText = handler(textArg+'\n');
            if(outboundText){
                args[0] = outboundText;
                err.apply(logger, args);
            }
        }
        console.warn = (...args)=>{
            const textArg = args[0].message?args[0].message:args[0];
            const outboundText = handler(textArg+'\n');
            if(outboundText){
                args[0] = outboundText;
                err.apply(logger, args);
            }
        }
        return ()=>{
            console.log = logger;
            console.warn = warn;
            console.error = err;
        }
    }
}