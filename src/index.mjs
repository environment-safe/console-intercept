
export const intercept = (handler, errHandler)=>{
    let reset = null;
    try{
        
        const logger = console.log;
        const err = console.error;
        const warn = console.warn;
        let trace = null;
        if(console.trace) trace = console.trace;
        let debug = null;
        if(console.debug) debug = console.debug;
        let info = null;
        if(console.info) info = console.info;
        console.log = (...args)=>{
            const textArg = args[0];
            const outboundText = handler(textArg+'\n');
            if(outboundText){
                args[0] = outboundText;
                logger.apply(logger, args);
            }
        };
        console.error = (...args)=>{
            const textArg = args[0].message?args[0].message:args[0];
            const outboundText = handler(textArg+'\n');
            if(outboundText){
                args[0] = outboundText;
                err.apply(logger, args);
            }
        };
        console.warn = (...args)=>{
            const textArg = args[0].message?args[0].message:args[0];
            const outboundText = handler(textArg+'\n');
            if(outboundText){
                args[0] = outboundText;
                err.apply(logger, args);
            }
        };
        if(trace){
            console.trace = (...args)=>{
                const textArg = args[0];
                const outboundText = handler(textArg+'\n');
                if(outboundText){
                    args[0] = outboundText;
                    trace.apply(logger, args);
                }
            };
        }
        if(debug){
            console.debug = (...args)=>{
                const textArg = args[0];
                const outboundText = handler(textArg+'\n');
                if(outboundText){
                    args[0] = outboundText;
                    debug.apply(logger, args);
                }
            };
        }
        if(info){
            console.info = (...args)=>{
                const textArg = args[0];
                const outboundText = handler(textArg+'\n');
                if(outboundText){
                    args[0] = outboundText;
                    info.apply(logger, args);
                }
            };
        }
        reset = ()=>{
            console.log = logger;
            console.warn = warn;
            console.error = err;
            if(trace) console.trace = trace;
            if(debug) console.debug = debug;
            if(info) console.info = info;
        };
        return reset;
    }catch(ex){
        process.exit();
        if(reset) reset();
        console.log('Error in console interception setup', ex);
    }
};