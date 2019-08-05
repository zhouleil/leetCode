const _items = Symbol('queueItems') ;

class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this[_items] = {};
    }
    // 向队列尾部添加一个或多个新的项
    enqueue(element) {
        this[_items][this.count] = element;
        this.count++;
    }
    // 移除队列的第一项，并返回被移除的元素
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this[_items][this.lowestCount];
        delete this[_items][this.lowestCount];
        this.lowestCount++;
        return result;
    }
    // 返回队列中的第一个元素
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this[_items][this.lowestCount];
    }
    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
    size() {
        return this.count - this.lowestCount;
    }

    clear() {
        this[_items] = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this[_items][this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this[_items][i]}`
        }

        return objString;
    }

}

module.exports = Queue