/**
 * 类型断言与类型守卫
 */

interface Person {
  name: string
  age: number
}

const person = {} as Person

person.name = 'zz'
person.age = 11

// 双重断言


// 类型守卫 1、instanceof
class Person {
  name = 'xx'
  age = 20
}

class Animals {
  name= 'petty'
  color = 'park'
}

function getSomething(arg: Person | Animals) {
  if (arg instanceof Person) {
    console.log(arg.age)
  }

  if (arg instanceof Animals) {
    console.log(arg.color)
  }
}

// 类型守卫 2、in

function getSomething2(arg: Person | Animals) {
  if ('age' in arg) {
    console.log(arg.age)
  }

  if ('color' in arg) {
    console.log(arg.color)
  }
}

// 类型守卫 3、字面量类型守卫

type Foo = {
  kind: 'foo'
  foo: number
}

type Bar = {
  kind: 'bar'
  bar: number
}

function doStuff(arg: Foo | Bar) {
  if (arg.kind  === 'foo') {
    console.log(arg.foo)
  } else {
    console.log(arg.bar)
  }
}

// 交叉类型

interface IanyObject {
  [propName: string] : string
}

function extend<T extends IanyObject, U extends IanyObject>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
      if (!result.hasOwnProperty(id)) {
          (<any>result)[id] = (<any>second)[id];
      }
  }
  return result;
}

