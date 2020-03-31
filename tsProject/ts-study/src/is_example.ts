/**
 * 赋值断言、is关键字、可调用类型注解、类型推导
 */


 // 1、明确赋值断言是一项功能，它允许将!放置在实例属性和变量声明之后，来表明此属性已经确定它已经被赋值了:

 let x: number
 initialize()
console.log(x! + x!)
 function initialize () {
   x = 10
 }

 // 2、is关键字
 function isString (test: any): test is string {
   return typeof test === 'string'
 }

 function example (foo: number | string) {
   if (isString(foo)) {
     console.log('it is a string' + foo)
     console.log(foo.length)
   }
 }

 example('hello world')

 // 他的作用就是判断 test 是不是 string 类型，并根据结果返回 boolean 相关类型.
 // 直接返回 boolean 报错了，因为 is 为关键字的「类型谓语」把参数的类型范围缩小了,当使用了 test is string 之后,我们通过 isString(foo) === true 明确知道其中的参数是 string,而 boolean 并没有这个能力,这就是 is 关键字存在的意义.

  type Maybe<T> = T | void

  function isDefined<T>(x: Maybe<T>): x is T {
    return x !== undefined && x !== null
  }

  function isUndefined<T>(x: Maybe<T>): x is void {
    return x === undefined || x === null
  }

  function getOrElse<T>(x: Maybe<T>, defaultValue: T): T {
    return isDefined(x) ? x : defaultValue
  }

  function test1(x: Maybe<string>) {
    let x1 = getOrElse(x, "Undefined");         // string
    let x2 = isDefined(x) ? x : "Undefined";    // string
    let x3 = isUndefined(x) ? "Undefined" : x;  // string
  }

  function test2(x: Maybe<number>) {
    let x1 = getOrElse(x, -1);         // number
    let x2 = isDefined(x) ? x : -1;    // number
    let x3 = isUndefined(x) ? -1 : x;  // number
  }
  
 // 3、可调用类型注解

 interface ToString {
   new (): string
 }

 declare const sometingToString: ToString

 new sometingToString()

 // 类型推导
interface Action {
  type: 'update'
  payload: {
    id: number
  }
}

 const actions: Action = {
  type: 'update',
  payload: {
    id: 10
  }
}