@environment-safe/console-intercept
===================================
When you want to intercept console output in a uniform way across the server and browser (probably in a test suite that can run on the command line and browser).

import it with:

```javascript
import { intercept } from '@environment-safe/console-intercept'; 
```

require it with (only supported in the browser via babel/webpack/browserify):

```javascript
const { intercept } = require( '@environment-safe/console-intercept'); 
```

Use it like:

```javascript
const terminate = intercept((text)=>{
   //do something with the text here
   return ''; //return what *actually* gets output
});
// log some things
terminate(); //stop intercepting
```