/**
 * 散列算法的作用是尽可能快地在数据结构中找到一个值。
 */

 const { defaultToString } = require('../util');

 class ValuePair {
    constructor(key,value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}

 class HashTable {
     constructor(toStrFn = defaultToString) {
         this.toStrFn = toStrFn;
         this.table = {}
     }
     // 向散列表中增加一个新的项
     set(key,value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true
        }
     }
     // 根据键值从散列中移除值
     remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
     }
     // 根据键值检索到的特定的值
     get(key) {
        const valuePair = this.table[this.hashCode[key]];
        return valuePair == null ? undefined : valuePair.value;
     }
      // 散列函数
     loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
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
 }

 const hash = new HashTable();

 hash.set('Gandalf', 'gandlf@email.com');
 hash.set('Johe', 'johe@email.com');
 hash.set('Tyrion', 'ryrion@email.com');
 hash.set('John', 'john@email.com');
 hash.set('Yonathan','jonathan@email.com');
 hash.set('Jamie','jamie@email.com');


 
 console.log(hash)
 console.log(hash.get('dada'))
 