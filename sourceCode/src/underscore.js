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

    // Create quick reference variables for speed access to core prototypes.
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    // All **ECMAScript 5** native function implementations that we hope to use
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create;
        
    // Naked function reference for surrogate-prototype-swapping.
    var Ctor = function() {};

    // Create a safe reference to the Underscore object for use below.
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    }

    // Export the Underscore object for **Nodejs** , with
    // backwards-compatibility for their old module API. If we're in
    // the browser , add `_` as a global object.
    // (`nodeType` is checked to ensure that `module`
    // and `exports` are not HTML elements.) 
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    // current version
    _.VERSION = '1.9.1';

    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore 
    // functions
    var optimizeCb = function(func , context , argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function(value) {
                return func.call(context , value);
            };
            case 3: return function(value , index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function() {
            return func.apply(context, arguments);
        };
    };

    var builtinIteratee;

    // An internal function to generate callbacks that can be applied to each
    // element in a collection , returning the desired result - either `identity`,
    // an arbitrary callback, aproperty matcher , or aproperty accessor.
    var cb = function (value , context , arguments) {
        if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, arguments);
        if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
        return _.property(value);
    }

    // External wrapper for our callback generator. Users may customize 
    // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
    // This abstraction hides the internal-only argCount argument.
    _.iteratee = builtinIteratee = function(value, context) {
        return cb(value, context , Infinity);
    }

    // Some functions take  a variable number of arguments , or a few expected
    // arguments at the beginning and then a variable number of values to operate 
    // on. This helper accumulates all remaining arguments past the function's
    // argument length (or an explicit `startIndex`), into an array that becomes
    // the last arguments. Slimilar to Es6's "rest parameter".
    var restArguments = function (func, startIndex) {
        startIndex = startIndex == null ? func.length  - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0),
            rest = Array(length),
            index = 0;
            for (;index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0 : return func.call(this , rest);
                case 1 : return func.call(this, arguments[0], rest);
                case 2 : return func.call(this, arguments[0], arguments[1], rest);
            }
            var args = Array(startIndex + 1);
            for (index = 0; index < startIndex; index++) {
                args[index] = arguments[index];
            }
            args[startIndex] = rest;
            return func.apply(this, args);
        }
    }
    var baseCreate = function(prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    }

    var shallowProperty = function (key) {
        return function(obj) {
            return obj = null ? void 0 : obj[key];
        }
    }

    var has = function(obj, path) {
        return obj != null && hasOwnProperty.call(obj, path);
    }

    var deepGet = function(obj, path) {
        var length = path.length;
        for (var i = 0 ; i < length; i++) {
            if (obj == null) return void 0;
            obj = obj[path[i]];
        }
        return length ? obj : void 0;
    }

    // Helper for colection methods to determine whehter a collection
    // should be iterated as an array or as an object.
    // Avoids a very nasty IOS 8 JIT bug on ARM-64
    var MAX_ARRAY_INDEX = Math.pow(2,53) - 1;
    var getLength = shallowProperty('length');
    var isArrayLike = function(colection) {
        var length = getLength(colection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    }

    // Collection Functions
    // ------------------------

    // The cornerstone, an `each` implementation , aka `forEach`.
    // Handles raw objects in addition to array-likes. Treats all
    // sparse array-likes as if they were dense.
    _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i , length;
        if (isArrayLike(obj)) {
            for (i = 0 , length = obj.length; i < length; i++) {
                iteratee(obj[i], i ,obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0 , length = key.length; i < length; i++) {
                iteratee(obj[keys[i]], key[i], obj);
            }
        }
        return obj;
    }

    // Return the results of apply the iteratee to each element.
    _.map = _.collect = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }   
        return results;
    }

    // Create a reducing function iterating left or right.
    var createReduce = function(dir) {
        var reducer = function(obj, iteratee, memo, initial) {
            var keys = !isArrayLike(obj) && _.key(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;
                if (!initial) {
                    memo = obj[keys ? keys[index] : index];
                    index += dir;
                }
                for (; index >= 0 && index < length; index += dir) {
                    var currentKey = keys ? keys[index] : index;
                    memo = iteratee(memo, obj[currentKey], currentKey , obj);
                }
                return memo;
        }
        return function(obj, iteratee, memo , context) {
            var initial = arguments.length >= 3;
            return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
        }
    }

    _.reducer = _.foldl = _.inject = createReduce(1);

    _.reducerRight = _.foldr = createReduce(-1);

    _.find = _.detect = function(obj, predicate, context) {
        var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
        var key = keyFinder(obj, predicate, context);
        if (key != void 0 && key !== -1) return obj[key];
    };

    
})();