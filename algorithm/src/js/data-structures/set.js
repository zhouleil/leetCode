/**
 * 集合
 * 
 * 集合运算--
 * 并集：对于给定的两个集合，返回一个包含两个集合中所有集合的新元素。
 * 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
 * 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存
 * 在第二个集合的元素的新集合。
 * 子集：验证一个给定集合是否是另一个集合的子集。
 */

 class Set {
     constructor() {
         this.items = {};
     }
     // 向集合添加一个新元素
     add(element) {
        if (!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
     }
     // 从集合移除一个元素
     delete(element) {
        if (this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
     }
     // 如果元素在集合中，返回 true,否则 返回 false
     has(element) {
        // return element in this.items;
        return Object.prototype.hasOwnProperty.call(this.items, element);
     }
     // 移除集合中所有的元素
     clear() {
        this.items = {};
     }
     // 返回集合所包含的元素的数量。与数组的length属性类似。
     size() {
        return Object.keys(this.items).length;
     }
     // 等同于size方法
     sizeLegacy() {
        let count;
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
     }
     // 返回一个包含集合中所有值（元素）的数组。
     values() {
        return Object.values(this.items);
     }
     // 等同于values方法
     valuesLegacy() {
         let values = [];
         for (let key in this.items) {
             if (this.items.hasOwnProperty(key)) {
                 values.push(key);
             }
         }
         return values;
     }
     // 并集
     union(otherSet){
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
     }
     // 交集
     intersection(otherSet) {
         const intersection = new Set();
         const values = this.values();
         const otherValues = otherSet.values();
         let biggerSet = values;
         let smallerSet = otherValues;
         if (otherValues.length - values.length > 0) {
             biggerSet = otherValues;
             smallerSet = values;
         }
         smallerSet.forEach(value => {
             if (biggerSet.includes(value)) {
                 intersection.add(value);
             }
         });
         return intersection;
     }

     // 差集
     difference(otherSet) {
         const differenceSet = new Set();
         this.values().forEach(value => {
             if (!otherSet.has(value)) {
                 differenceSet.add(value);
             }
         })
         return differenceSet;
     }
     // 子集
     isSubsetOf(otherSet) {
         if (this.size() > otherSet.size()) {
             return false;
         }
         let isSubset = true;
         this.values().every(value => {
             if (!otherSet.has(value)) {
                 isSubset = false;
                 return false;
             }
             return true;
         })
         return isSubset;
     }
 }

