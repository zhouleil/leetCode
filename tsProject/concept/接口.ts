
function printLabel(labelledojb: { label: string}) {
    console.log(labelledojb.label)
}
let myObj = { size: 10 , label: 'Size 10 Object'};
printLabel(myObj);

interface LabelledValue {
    label: string;
}
function printLabel1(labelledobj: LabelledValue) {
    console.log(labelledobj.label)
}
printLabel1(myObj)

// 可选属性。 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。
// 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any; // 其他属性
}

function createSquare(config: SquareConfig): { color: string; area: number} {
    let newSquare = { color: 'white', area: 100 };
    let { color , width } =  config;
    if (color) {
        newSquare.color = color;
    }
    if (width) {
        newSquare.area =  width * width;
    }
    return newSquare;
}

let mySquare = createSquare({ color : 'brack'});

// 只读属性。一些属性只能在对象刚刚创建的时候修改其值。 可以在属性名前用 readonly来指定只读属性。
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x : 10, y : 20};
// 赋值后，x 和 y 再也不能改变了。
// p1.x = 5; // error

// 数组的 readonlyArray
let a: number[] = [1,2,3,4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error
// ro.push(5); // error
// ro.length = 100; // error

/**
 *  readonly vs const
 * 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。
 */

 // 函数类型
 interface SearchFunc {
     (source: string, subString: string): boolean
 }
 let mySearch: SearchFunc;
 mySearch = function(source:string,subString: string) {
     let result = source.search(subString);
     return result > -1;
 }
 /**
  * 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子：
  * let mySearch: SearchFunc;
  * mySearch = function(src: string, sub: string): boolean {
  *     let result = src.search(sub);
  *     result result > -1;
  * }
  */

 let mySearch1: SearchFunc;
 mySearch1 = function(src, sub) {
     let result = src.search(sub);
     return result > -1;
 }

 // 可索引的类型
 interface StringArray {
     [index: number]: string;
 }
 let myArray: StringArray;
 myArray = ["BOB","Fred"];

 let myStr: string = myArray[0];

// 类类型
/**
 * 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员
 */
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): any;
    tick();
}


interface ClockConstructor {
    new ( hour: number, minute: number): ClockInterface
}

function createClock(ctor: ClockConstructor, hour: number, minute: number) : ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {

    }
    tick() {
        console.log('beep beep')
    }
    currentTime: Date

    setTime(d: Date) {
        this.currentTime = d;
    }

}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) {

    }
    tick() {
        console.log('tick tock')
    }
    currentTime: Date

    setTime(d: Date) {
        this.currentTime = d;
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 继承接口

interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;

// 继承多个接口
interface Square1 extends Shape, PenStroke {
    sideLength: number
}

let square1 = <Square1>{};
square1.color = "blue";
square1.sideLength = 10;
square1.penWidth = 5.0;