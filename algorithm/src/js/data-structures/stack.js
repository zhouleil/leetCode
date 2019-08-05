const _items = Symbol('stackItems');

class Stack {
    constructor() {
        this.count = 0;
        this[_items] = {};
    }
    push(element) {
        this[_items][this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this[_items][this.count];
        delete this[_items][this.count];
        return result;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this[_items][this.count - 1];
    }
    // 如果栈里没有任何元素就返回true,否则返回false
    isEmpty() {
        return this.count === 0;
    }
    // 移除栈里的所有元素
    clear() {
        this[_items] = {};
        this.count = 0;
        /**
         while(!this.isEmpty()) {
             this.pop();
         }
         */
    }
    size() {
        return this.count;
    }
    toString() {
        if (this.isEmpty())  {
            return '';
        }
        let objString = `${this[_items][0]}`;
        for(let i = 1; i < this.count; i++) {
            objString = `${objString},${this[_items][i]}`;
        }
        return objString;
    }
}
// 10进制转换2进制
function decimalToBinary (decNumber) {
    const remStack = new Stack();
    let number = decNumber;
    let rem;
    let binaryString = '';

    while (number > 0) {
        rem = Math.floor(number % 2);
        remStack.push(rem);
        number = Math.floor(number / 2);
    }

    while(!remStack.isEmpty()) {
        binaryString += remStack.pop().toString();
    }

    return binaryString;
}

// 任意进制转换
function baseConverter(decNumber,base) {
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
    let baseString = '';

    if (!(base >= 2 && base <= 36)) {
        return '';
    }

    while (number > 0) {
        rem = Math.floor(number % base);
        remStack.push(rem);
        number = Math.floor(number / base);
    }

    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()];
    }

    return baseString;
}


var smy =  Symbol('hhh');
class Stack1 {
    constructor() {

    }
}

