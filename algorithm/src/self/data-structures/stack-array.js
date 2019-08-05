/**
 * 栈 先进后出
 * FILO(First In Last Out)
 */
class Stack {
    constructor () {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length -1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    toString() {
        return this.items.toString();
    }
    clear() {
        this.items = [];
    }
}