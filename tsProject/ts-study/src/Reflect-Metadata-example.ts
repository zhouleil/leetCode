
import 'reflect-metadata'

@Reflect.metadata('name', 'A')
class A {

  @Reflect.metadata('hello', 'world')
  public hello (): string {
    return 'hello world'
  }
}

const name = Reflect.getMetadata('name', A)
// 获取 hello函数上面的 hello 属性， world
const hello = Reflect.getMetadata('hello', new A(), 'hello')

console.log('name', name)
console.log('hello', hello)

// 博客系统路由
const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'

const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target)
  }
}

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value!)
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value!)
  }
}

const Get = createMappingDecorator('GET')
const Post = createMappingDecorator('POST')

@Controller('/article')
class Home {
  @Get('/content')
  someGetMethod () {
    return 'hello world'
  }

  @Post('/comment')
  somePostMethod () { }
}


/** 工具函数 **/

function isConstructor (symbol: any): boolean {
  return notUndefined(symbol) &&
    symbol instanceof Function &&
    symbol.constructor &&
    symbol.constructor instanceof Function &&
    notUndefined(new symbol) &&
    Object.getPrototypeOf(symbol) !== Object.prototype &&
    symbol.constructor !== Object &&
    symbol.prototype.hasOwnProperty('constructor');
};

function notUndefined (item: any): boolean {
  return item != undefined && item != 'undefined';
}

function isFunction (value: any): value is Function {
  return typeof value === 'function';
}


function mapRoute (instance: Object) {
  const prototype = Object.getPrototypeOf(instance);

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype)
    .filter(item => !isConstructor(item) && isFunction(prototype[item]));
    
  return methodsNames.map(methodName => {
    const fn = prototype[methodName];

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn);
    const method = Reflect.getMetadata(METHOD_METADATA, fn);
    return {
      route,
      method,
      fn,
      methodName
    }
  })
};


Reflect.getMetadata(PATH_METADATA, Home);

const info = mapRoute(new Home());

console.log(info);