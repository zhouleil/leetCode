/**
 * 高级类型
 */

 // 1、交叉类型  &

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


// 2、联合类型 |

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  // ...
  const layEggs = (): void => {}
  const fly = (): void => {}
  const swim = (): void => {}

  return {
    layEggs,
    fly,
    swim
  }
}

let pet = getSmallPet();
pet.layEggs(); // okay
// pet.fly();    // errors

// 3、类型保护与区分类型

// if (pet.swim) { // errors
//   pet.swim()
// }

// 使用类型断言
if ((<Fish>pet).swim) {
  (<Fish>pet).swim()
} else {
  (<Bird>pet).fly()
}

// 用户自定义的类型保护

function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined
}
// 在这个例子里， pet is Fish就是类型谓词。 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。

// 简化为
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// typeof类型保护

function isString(x: any): x is string {
  return typeof x === "string";
}

// instanceof类型保护


// 索引类型

// function pluck(o, names) {
//   return names.map(n => o[n]);
// }

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
  name: string;
  age: number;
}

let personInfo: Person = {
  name: 'Jarid',
  age: 35
};

let strings: string[] = pluck(personInfo, ['name']); // ok, string[]

// 首先是 keyof T， 索引类型查询操作符。对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。 例如：
let personProps: keyof Person; // 'name' | 'age'

// 第二个操作符是 T[K]， 索引访问操作符。

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}

// 索引类型和字符串索引签名

// 映射类型

// interface PersonPartial {
//   name?: string;
//   age?: number;
// }

interface PersonReadonly {
  readonly name: string;
  readonly age: number;
}

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;

interface Userr {
  id: number;
  age: number;
  name: string;
};
// 相当于: type PartialUser = { id?: number; age?: number; name?: string; }
type PartialUser = Partial<Userr>

// 相当于: type PickUser = { id: number; age: number; }
type PickUser = Pick<Userr, "id" | "age">

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>

// type Exclude<T, U> = T extends U ? never : T;

type OmitUser = Omit<Userr, "id">

// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;


// 取去part中函数类型的 key

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

type R = FunctionPropertyNames<Part>;

// 取去 Peoples 中可选key
interface Peoples  {
  id: string
  name: string
  age?: number
  from?: string
}

// type NullableKeys<T> = 

// type P = NullableKeys<Peoples>