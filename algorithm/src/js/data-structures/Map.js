/**
 * 字典类 即ES6 Map类
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

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    // 向字典中添加新元素。如果key已经存在，那么已存在的value会被新的值覆盖
    set(key,value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key,value);
            return true;
        }
        return false;
    }
    // 通过使用键值作为参数来从字典中移除键值对应的数据值。
    remove(key) {
        if (this.haskey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    // 如果某个键值存在于该字典中，返回 true ，否则返回 false
    haskey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    // 通过以键值作为参数查找特定的数值并返回
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
        
        /**
         *  这种方法访问了两次 this.table
            if (this.haskey(key)) {
                return this.table[this.toStrFn(key)];
            }
            return undefined;
         */

    }
    clear() {
        this.table = {};
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    // 将字典所包含的所有键名以数组形式返回
    keys() {
        return this.keyValues().map(valuePairs => valuePairs.key);
        /**
          const keys = [];
          const valuePairs = this.keyValues();
          for (let i = 0;i < valuePairs.length; i++) {
              keys.push(valuePairs[i].key);
          }
          return keys;
         */
    }
    // 将字典所包含的所有数值以数组形式返回
    values() {
        return this.keyValues().map(valuePairs => valuePairs.value);
    }
    // 将字典中的所有 [键，值]对返回
    keyValues() {
        const valuePairs = [];
        for (const k in this.table) {
            if (this.haskey(k)) {
                valuePairs.push(this.table[k])
            }
        }
        return valuePairs;
        /*
        *   也可以用Object.values
            return Object.values(this.table);
        */
    }
    // 迭代字典中所有的键值对。callbackFn有两个参数： key 和 value,
    // 该方法可以在回调函数返回false时被中止（和Array类中的every方法类似）
    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for(let i = 0; i < valuePairs.length;i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length;i++) {
            objString = `${objString}, ${valuePairs[i].toString}`;
        }
        return objString;
    }
    
}


const dictionary = new Dictionary();
dictionary.set("Gandalf", 'gandlef@mail.com');
dictionary.set("John", 'John@mail.com');
dictionary.set("Tyrion", 'Tyrion@mail.com');


console.log(dictionary);
console.log(dictionary.get("John"))
console.log(dictionary.keyValues())
console.log(dictionary.keys())
