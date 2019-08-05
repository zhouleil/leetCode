class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // 在双端队列的前端添加元素
    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element);
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        } else {
            for(let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;
        }
    }
    // 在双端队列的后端添加元素 同 queue enQueue 方法
    addBack(element) {
       this.items[this.count] = element;
       this.count++;
    }
    // 移除双端队列前端的第一个元素 同 queue delQueue 方法
    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        const first = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return first;
    }
    // 移除双端队列后端的第一个元素 同 stack pop 方法
    removeBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const last = this.items[this.count];
        delete this.items[this.count];
        return last;
    }
    // 返回双端队列的前端第一个元素
    peekFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    // 返回双端队列后端的第一个元素
    peekBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        return  this.items[this.count - 1];
    }

    isEmpty() {
        return this.count - this.lowestCount === 0;
    }

    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    size() {
        return this.count - this.lowestCount;
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

module.exports = Deque;