/**
 * 遍历数组
 * @param {Array} array 
 * @param {Function} fn 
 */
const forEach = (array ,fn) => {
    let i;
    for (i = 0; i < array.length; i++) {
        fn(array[i]);
    }
}
/**
 * 遍历对象
 * @param {Object} obj 
 * @param {Function} fn 
 */
const forEachObject = (obj , fn) => {
    for (let property in obj ) {
        if (obj.hasOwnProperty(property)) {
            fn(property, obj[property]);
        }
    }
}

/**
 * 
 * @param {Boolean} predicate 
 * @param {Function} fn 
 */
const unless = (predicate , fn) => {
    if (!predicate) fn();
}

/**
 * 
 * @param {Number} times 
 * @param {Function} fn 
 */
const times = (times , fn) => {
    for (let i = 0; i < times; i++) {
        fn(i);
    }
}

/**
 * 
 * @param {Array} arr 
 * @param {Function} fn 
 */
const every = (arr ,fn) => {
    let result = true;
    // for (let i = 0; i < arr.length; i++) {
    //     result = result && fn(arr[i])
    // }
    for (const value of arr) {
        result  = result && fn(value);
        if (!result) {
            break;
        }
    }
    return result;
}

/**
 * 
 * @param {ArrAy} arr 
 * @param {Function} fn 
 */
const some = (arr, fn ) => {
    let result = false;
    for (const value of arr)  {
        result = result || fn(value);
        if (result) {
            break;
        }
    }
    return result;    
}

/**
 * 
 * @param {String} property 
 */
const sortBy = (property) => {
    return (a ,b) => {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result;
    }
}

/**
 * 
 * @param {*} value 
 */
const tap = (value) =>
    (fn) => (
        typeof(fn) === 'function' && fn(value),
        console.log(value)
    );

/**
 * 
 * @param {*} fn 
 */
const unary = (fn) =>  
    fn.length === 1
        ? fn 
        : (arg) => fn(arg);

/**
 * 只可调用一次
 * @param {Function} fn 
 */
const once = (fn) => {
    let done = false;
    return function() {
        return done ? undefined : ((done = true), fn.apply(this, arguments))
    }
}
/**
 * 阶乘 纯函数
 * @param {Number} n 
 */
const factorial = (n) => {
    if (n === 0) {
        return 1;
    }
    // 这是递归
    return n * factorial(n -1);
};

// const factorial = (n, total) => {
//     if (n === 1) return total;
//     return factorial(n - 1, n * total);
// };

const memoized = (fn) => {
    const  lookupTable = {};
    return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg));
}
const fastFactorial = memoized((n) => {
    if (n === 0) {
        return 1;
    }
    return n * fastFactorial(n -1);
})

const map = (arr, fn) => {
    let results = [];
    for (const value of arr) 
        results.push(fn(value));
    return results;        
}

const filter = (arr, fn) => {
    let results = [];
    for (const value of arr) 
        (fn(value)) ? results.push(value) : undefined;
    return results;
}

const concatAll = (arr, fn) => {
    let results = [];
    for (const value of arr) 
        results.push.apply(results, value);
    return results;        
}
const reduce = (arr, fn , initialValue ) => {
    let accumlator;
    if (initialValue != undefined) 
        accumlator = initialValue;
    else 
        accumlator = arr[0];
    
    if (initialValue === undefined) {
        for(let i = 1; i < arr.length;i++) {
            accumlator = fn(accumlator , arr[i])
        }
    }     
    else     
        for (const value of arr) 
            accumlator = fn(accumlator, value);
    return [accumlator];    
}

const zip = (leftArr, rightArr, fn) => {
    let index, results = [];
    for (index = 0; index < Math.min(leftArr.length , rightArr.length); index++) 
        results.push(fn(leftArr[index], rightArr[index]));
    return results;
}

/**
 * 柯里化是把一个多参数函数转换为一个嵌套的一元函数的过程。
 */
const add = (x, y) => x + y;
const curry = function(binaryFn) {
    return function (firstArg) {
        return function (secondArg) {
            return binaryFn(firstArg, secondArg);
        };
    };
};
let autoCurriedAdd = curry(add);
autoCurriedAdd(2)(2);
// => 4


const curryN = (fn) => {
    if (typeof fn !== 'function') {
        throw Error('No function provided');
    }
    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function() {
                return curriedFn.apply(null, args.concat(
                    [].slice.call(arguments)
                ))
            };
        }
        return fn.apply(null, args);
    }
}

const multiply = (x, y ,z) => x * y * z;
curryN(multiply)(1)(2)(3);
curryN(multiply)(1,2,0);

const match = curryN(function(expr ,str) {
    return str.match(expr);
});
let hasNumber = match(/[0-9]+/);
let filtert = curryN(function(f ,arr) {
    return arr.filter(f);
})
let findNumbersInArray = filtert(hasNumber);
console.log(findNumbersInArray(['js', 'number1']));

const arrayUtils = {
    map,
    forEach,
    every,
    some,
    filter,
    concatAll,
    reduce
}
export {
    forEachObject,
    unless,
    times,
    sortBy,
    tap,
    unary,
    once,
    memoized,
    fastFactorial,
    arrayUtils
}