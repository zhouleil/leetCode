/**
 * 链表：链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是
 * 连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用
 * （也称指针或者链接）组成。
 */
const { defaultEquals }  = require('../util');
const { Node } = require('../models/linked-list-models');

class LinkedList {
    constructor( equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined; // 第一个元素的引用
        this.equalsFn = equalsFn;
    }
    // 向链表尾部添加一个新元素
    push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            // 循环获取下一个元素的引用，直到最后一个元素
            while(current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
    // 向链表的特定位置插入一个新元素
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index -1);
                const current = previous.next;
                node.next = current; // 插入位置的下一个引用成为 current
                previous.next = node; // 插入位置的上一个引用 
            }
            this.count++;
            return true;
        }
        return false;
    }
    // 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined。
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    // 从链表中移除一个元素。
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    // 从链表的特定位置移除一个元素。
    removeAt(index) {
        // 检查越界值
        if (index >= 0 && index < this.count) {
            let current = this.head;

            // 移除第一项
            if (index === 0) {
                this.head = current.next;
            } else {
                // let previous;
                // for (let i = 0; i < index; i++) {
                //     previous = current;
                //     current = current.next;
                // }
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                // 将previous与current 的下一项链接起来，跳过 current,从而移除它；
                // 当前节点被丢弃在计算机内存中，等着被垃圾回收器清除。
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }

    // 返回元素在链表中的索引。如果链表中没有该元素则返回 -1。
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null;i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.count;
    }
    getHead() {
        return this.head;
    }
    // 返回整个链表的字符串
    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
    clear() {
        this.head = undefined;
        this.count = 0;
    }
}

const list = new LinkedList();
list.push(15);
list.push(10);
list.push(11);
console.log(list);
const a = list.getElementAt(2);
console.log(a);


module.exports = LinkedList;

