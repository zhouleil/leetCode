(function(){
    // Establist the root object, `window` (`self`) in the browser , `global`
    // on the server , or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this || 
            {};

    // Save the previous value of the `_` variable.
    var previousUnderscore = root._;            
    
    // save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

    //
})();