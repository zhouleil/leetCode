/**
 * 循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。
 * 循环链表和链表之间唯一的区别在于，最后一个元素(tail.next)指向下一个元素的指针
 * 不是引用 undefined ,而是指向第一个元素 （head)。
 * 双向循环列表有指向head元素的tail.next 和指向 tail元素的head.prev。
 */

 const LinkedList = require('./linkedList');
 const { defaultEquals }  = require('../util');
 const { Node }  = require('../models/linked-list-models');

 class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }
    insert(element , index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    current = this.getElementAt(this.size());
                    // 更新最后一个元素
                    this.head = node;
                    current.next = this.head;
                }
            } else {
                const previous = this.getElementAt(index -1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined;
                } else {
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
 }  

