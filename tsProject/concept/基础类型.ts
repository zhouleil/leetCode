// boolean
let isDone: boolean = false;
// number
let decLiteral: number = 6;
// string
let FirstName: string = 'book';
// array
let list: number[] = [1,2,3];
let arr1: any[] = [1,'2', [1]];

// enum
enum Color { Red ,Green ,Blue};
enum Res {
    No = 0,
    Yes = 1,
}
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
// Any
let notSure: any = 4;
notSure = "Maybe a string instead";
notSure = false;

// Void
function waryUser(): void {
    console.log("This is my warning message!");
}

// Null Undefined
let u: undefined = undefined;
let n: null = null;

// Never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true ){

    }
}

// Object
declare function create(o: object | null): void;
create(null); // ok
create({ prop: 0}) // ok
// create(42); // Error;

// 断言
let someValue: string = "this is string";
// 尖括号语法
let strLength: number = (<string>someValue).length;
// as语法(TypeScript 里使用JSX时，只有 as 语法断言被允许)
let strLength1: number = (someValue as string).length;