/**
 * 散列算法的作用是尽可能快地在数据结构中找到一个值。
 */

 const defaultToString = require('../util');


 class HashTable {
     constructor(toStrFn = defaultToString) {
         this.toStrFn = defaultToString;
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

     }
     // 根据键值检索到的特定的值
     get(key) {

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
        return hash % 37;
     }

     hashCode(key) {
         return this.loseloseHashCode(key);
     }
 }