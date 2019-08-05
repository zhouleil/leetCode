class Stack {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const v = this.items[this.count];
        delete this.items[this.count];
        return v;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return  this.items[this.count - 1];
    }
    isEmpty() {
        return this.count === 0;
    }
    size() {
        return this.count
    }
    clear() {
        this.items = {};
        this.count = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objStr = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objStr += `,${this.items[i]}`;
        }
        return objStr;
    }
}


var stack  = new Stack();
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(6);
console.log(stack.peek())

console.log(stack.pop())

console.log(stack.toString())

console.log(stack.size())