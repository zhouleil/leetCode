/**
 * 给定一个整数数组 nums 和一个目标值 target ，请你在该数组中找出
 * 和为目标值的那两个整数，并返回他们的数组下标。
 * 
 * 你可以假设每种输入只会对应一个答案；但是，你不能重复利用这个数组中
 * 同样的元素。
 * 
 * 示例：
 *  给定 nums = [2, 7, 11, 15], target = 9
 * 
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 */

 /**
  * 
  * @param {number []} nums 
  * @param {number} target
  * @return {number []} 
  */
 var twoSum = function(nums,target) {
     var num1, num2;
     var result = [];
     for (var i = 0; i < nums.length; i++) {
         var num1 = nums[i];
         for (var j = 0;j < nums.length; j++) {
             if (j == i ) continue;
             var num2 = nums[j];
             if (target - num1 === num2) {
                 result[0] = i;
                 result[1] = j;
                 break;
             }
         } 
         if (result.length == 2) {
             break;
         }
     }
     console.log(num1, num2);
     return result;
 }