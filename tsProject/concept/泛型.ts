// 不使用泛型
function identity(arg: number): number {
    return arg;
}
// 或者
function identity1(arg: any): number {
    return arg;
}

// 使用泛型

/**
 * 我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。
 * 我们把这个版本的identity函数叫做泛型，因为它可以适用于多个类型。 不同于使用 any，它不会丢失信息，像第一个例子那像保持准确性，传入数值类型并返回数值类型。
 */
function identity2<T>(arg: T): T {
    return arg;
}

let  output1 = identity2("myIsString");
let  output2 = identity2(1);