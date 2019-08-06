/**
 * 双向链表： 双向链表和普通链表的区别在于，在链表中，一个节点只有
 * 链向下一个节点的链接；而在双向链表中，链接是双向的：一个链向下一
 * 个元素，另一个链向前一个元素。
 */
const { DoublyNode } = require('../models/linked-list-models');
const LinkedList = require('./linkedList');
const { defaultEquals }  = require('../util');

class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined; // 链表对最后一个元素的引用
    }
    // 任意位置插入一个元素
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            }
            else if (index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            }
            else {
                const previous = this.getElementAt(index -1);
                current = previous.next;
                node.prev = previous;
                node.next = current;
                current.prev = node;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    // 任意位置移除一个元素
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
                if (this.count === 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                } 
            } 
            else if (index === this.count) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            } else {
                current = this.getElementAt(index);
                const previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}

const doublely = new DoublyNode();
