class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    enQueue(element) {
        this.items[this.count] = element;
        this.count++;
    }
    delQueue() {
        if (this.isEmpty()) {
            return undefined;
        }
        let first = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return first;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    size() {
        return this.count - this.lowestCount;
    }
    isEmpty() {
        return this.size() === 0;
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