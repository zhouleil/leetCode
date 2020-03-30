/**
 * 泛型
 */

function returnItem<T> (para: T): T {
  return para
}

returnItem('a')
returnItem(11)

// 多个类型参数
function swap<T, U> (tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swap([7, 'seven']) // ['seven', 7]


// 泛型变量
function loggingIdentity<T> (arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}

// 泛型类

class Stack {
  private arr: Array<number> = []

  public push (item: number) {
    this.arr.push(item)
  }

  public pop () {
    this.arr.pop()
  }
}

// 使用泛型
class Stack2<T> {
  private arr: Array<T> = []

  public push (item: T) {
    this.arr.push(item)
  }

  public pop () {
    this.arr.pop()
  }
}

// 泛型约束; 约束泛型为 number 或者 string 之一
type Params = number | string

class Stack3<T extends Params> {
  private arr: Array<T> = []

  public push (item: T) {
    this.arr.push(item)
  }

  public pop () {
    this.arr.pop()
  }
}

// 泛型约束与泛型索引

function getValue<T extends object, U extends keyof T> (obj: T, key: U): T[U] {
  return obj[key]
}

const a = {
  name: 'xiaomuzhu',
  id: 1
}

getValue(a, 'name')

// 使用多重类型进行泛型约束, 只被允许实现以下两个接口的类型呢

interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}

const doSomethingO: FirstInterface = {
  doSomething: () => 11
}

console.log(doSomethingO.doSomething())


class Dome<T extends SecondInterface & FirstInterface> {
  
  // ! 表示强制解析（也就是告诉typescript编译器，我这里一定有值）
  private genericProperty!: T

  useT () {
    this.genericProperty.doSomething()
    this.genericProperty.doSomethingElse()
  }
}

var demo = new Dome()

demo.useT

// 泛型与 new
function factory<T>(type: { new (): T}): T {
  // 参数 type 的类型 {new(): T} 就表示此泛型 T 是可被构造的，在被实例化后的类型是泛型 T。
  return new type()
}

