// 数字保留两位小数
transnumTwoDecimals = (num) => {
  const n = `${num}`.toString().match(/\.(?=(\d+))/) && `${num}`.toString().match(/\.(?=(\d+))/)[1]
  // 整数
  if (!n) {
    return `${num}.00`
  }
  // 有一位小数
  if (n.length === 1) {
    return `${num}0`
  }
  // 有两位以上小数
  if (n.length >= 2) {
    // return num.toFixed(2) // 四舍五入
    return Number(num.toString().match(/-?\d+(?:\.\d{0,2})?/))  // 不四舍五入 
  }
}

console.log(transnumTwoDecimals(12.50))


var obj = {
  /**
 * 数字转字符串并保留小数点后两位
 * @param {number} number //
 */
  transNumberTwoDecimals (number) {
    if (number === null) {
      return '0.00'
    }
    const n = `${number}`.toString().match(/\.(?=(\d+))/) && `${number}`.toString().match(/\.(?=(\d+))/)[1]
    // 整数
    if (!n) {
      return `${number}.00`
    }
    // 一位小数
    if (n.length === 1) {
      return `${number}0`
    }
    return `${number}`
  },
  /**
   * 重写toFixed
   * @param {number} n 原始数
   * @param {number} d 保留位数
   * @param {string} type 省略方式 round: 四舍五入； ceil: 向上取整； floor: 向下取整
   */
  toFixed (n, d, type = 'ceil') {
    if (d <= 0) {
      return n
    } else {
      let radix = Math.pow(10, d)
      let temp = Math[type](n * radix) / radix
      return temp
    }
  }
}

var a = obj.toFixed(1.23011, 2)
var a = obj.toFixed(333.333, 2, 'floor')

console.log(a)