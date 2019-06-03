/**
 * 给出一个 32 位有符号整数，你需要将这个整数中每位上的数字进行反转。
 * 
 * 示例1:
 * 输入： 123
 * 输出： 321
 * 
 * 示例2: 
 * 输入：-123
 * 输出：-321
 * 
 * 示例3: 
 * 输入： 120
 * 输出： 21
 */

 /**
  * 
  * @param {number} x 
  * @return {number}
  */
 var reverse = function(x) {
     // 是否负数
     var isMin = false; 
     if(/\-/.test(x)) {
        isMin = true;
     }
     x = isMin ? -x : x;
     var arr = x.toString().split('');
     var c = arr.reverse().join('');
     // 去掉后边0
     c = c.replace(/^0{1,}/,'');
     c = parseInt(isMin ? -c : c);
     if (c > Math.pow(2,31) -1 ) {
         return 0;
     }
     if (c < Math.pow(-2,31)) {
         return 0;
     }
     return c;
 }