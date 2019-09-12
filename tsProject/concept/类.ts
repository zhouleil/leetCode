/** 
 * 
 1、public  公共属性， 默认 
 2、private 私有属性，当成员被标记成 private时，它就不能在声明它的类的外部访问
 3、protected 受保护属性， 修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。
 4、static 静态属性， 
 5、你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

 6、abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 

 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
*/

class Animal {
    private name: string;
    constructor(theName: string) {
        this.name = theName
    }
}

class Rhino extends Animal {
    constructor() {
        super("Rhino")
    }
}

class Employee {
    private name: string;
    constructor(theName: string) {
        this.name  = theName
    }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee('Bob');

animal = rhino;
// animal = employee; // error  Animal 与 Employee 不兼容.


class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}
let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在