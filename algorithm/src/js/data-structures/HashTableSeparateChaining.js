const { defaultToString } = require('../util');
const LinkedList = require('./LinkedList');

class ValuePair {
    constructor(key,value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}
/**
 * 分离链接法包括为散列表的每一个位置创建一个链表并将原始存储在里面。
 * 它是解决冲突最简单的方法，但是在HashTabel 实例之外还需要额外的存储空间。
 */
class HashTableSeparateChaining {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};        
    }
    put(key,value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) {
                this.table[position] = new LinkedList();
            }
            this.table[position].push(new ValuePair(key,value));
            return true;
        }
        return false;
    }
    get(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while(current != null) {
                if (current.element.key === key) {
                    return current.element.value;
                }
            }
        }
        return undefined;
    }
    // 散列函数
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        // 防止key是对象而不是一个字符串，先将key转化为一个字符串
        const tableKey = this.toStrFn(key);
        // hash 每个字符串的 ASCII 值的总和
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        // 规避操作数超过数值变量最大表示范围的风险。
        return hash % 37;
    }

    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    isEmpty() {
        return Object.keys(this.table).length === 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `${keys[0]} => ${this.table[keys[0]].toString()}`;
        for (let i  = 1;i < keys.length; i++) {
            objString = `${objString},${keys[i]} => ${this.table[keys[i]].toString()}`;
        }
        return objString;
    }
}



const hash = new HashTableSeparateChaining();

hash.put('Gandalf', 'gandlf@email.com'); // key 19
hash.put('Johe', 'johe@email.com'); // 20
hash.put('Tyrion', 'ryrion@email.com'); // 16
hash.put('John', 'john@email.com'); // 29
hash.put('Yonathan','jonathan@email.com'); //  20
hash.put('Jamie','jamie@email.com'); // 5



console.log(hash)
console.log(hash.get('Johe'))
console.log(hash.toString())