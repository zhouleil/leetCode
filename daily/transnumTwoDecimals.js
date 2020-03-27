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