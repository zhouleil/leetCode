const partial = function (fn , ...partialArgs) {
    let args = partialArgs;
    return function(...fullArguments) {
        let arg = 0;
        for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = fullArguments[arg++];
            }
        }
        return fn.apply(null, args);
    }
}

let delayTenMs = partial(setTimout, undefined, 10);

delayTenMs(() => console.log('welcome!'));

/**
 * partial 分析, 部分应用函数参数，后续的操作只是补全之前为定义的参数；
 * 
 * fn setTimeout
 * args = partialArgs = [undefined, 10];
 * 
 * delayTenms = function(...fullArguments) {
 *      let arg = 0;
 *      // args.length 为函数 fn 的参数长度。 fullArguments 是后边补全 undefined 的后续添加参数；
 *      for (let i = 0; i < args.length && arg < fullArguments.length;i++) {
 *              // 当检测到 args中的某一项 undefined， 就把 fullArguments 中的参数赋值给 args[i], 以此来补全
 *              // fn应有参数；
 *              if (args[i] === undefined) {    
 *                  args[i] = fullArguments[arg++];
 *              }
 *      }
 *      // 返回补全后的 args, 并执行 fn。
 *      return fn.apply(null, args)
 * }
 */

 const compose = (...fns) => 
    (value) => 
        reduce(fns.reverse(), (acc,fn) => fn(acc), value);


let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;
const countWords = compose(count, splitIntoSpaces);

countWords("hello your reading about composition");

/**
 * fns [count, splitIntoSpaces];
 * fns.reverse() => [splitIntoSpaces]；
 * 
 * compose(count, splitIntoSpaces)  执行返回 countWords =>
 * (value) => 
 *      reduce([splitIntoSpaces,count], (acc,fn) => fn(acc), value);
 * 
 * 分析  reduce([splitIntoSpaces,count], (acc,fn) => fn(acc), value);
 * 
 * reduce 签名 reduce(arr, fn ,init)      
 * 第一步执行返回了 splitIntoSpaces 执行的结果，作为 count的参数
 * acm = fn(value,splitIntoSpaces) => splitIntoSpaces(value);
 * 第二布执行返回 count 的结果
 */

