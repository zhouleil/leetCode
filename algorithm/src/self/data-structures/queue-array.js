/**
 * 队列： 先进先出(FIFO)
 */
class Queue{
    constructor() {
        this.items = [];
    }
    enQueue(element) {
        this.items.push(element);
    }
    delQueue() {
        return this.items.shift();
    }
    peek() {
        return this.items[0];
    }
    clear() {
        this.items = []
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
}

var queue = new Queue();

queue.enQueue(1);
queue.enQueue(3);
queue.enQueue(2);

queue.delQueue();