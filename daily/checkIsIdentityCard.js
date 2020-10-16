// 验证身份证格式

function isValidDate (datestr) {
  let year = 0
  let month = 0
  let date = 0
  // 20080315
  // 参数必须为8位，且只能为数字
  year = Number(datestr.slice(0, 4))
  month = Number(datestr.slice(4, 6))
  date = Number(datestr.slice(6))

  const dateObj = new Date(year, month - 1, date)
  const nYear = dateObj.getFullYear()
  const nMonth = dateObj.getMonth() + 1
  const nDate = dateObj.getDate()

  if (year === nYear && month === nMonth && date === nDate) {
    return true
  }
  return false
}

function checkIsIdentityCard (identityCard) {
  if (identityCard.length <= 0) {
    return false
  }
  // 判断是否是 18 位，末尾是否是 X
  let regex2 = /^(\d{14}|\d{17})(\d|[xX])$/
  if (!regex2.test(identityCard)) {
    return false
  }
  // 判断生日是否合法
  let datestr = identityCard.substr(6, 8)
  if (!isValidDate(datestr)) {
    return false
  }

  // 判断校验位
  if (identityCard.length === 18) {
    // 将前17位加权因子保存在数组里
    let idCardWi = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']
    // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
    let idCardY = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let idCardWiSum = 0

    // 用来保存前17位各自乖以加权因子后的总和
    for (let i = 0; i < 17; i++) {
      idCardWiSum += identityCard[i] * idCardWi[i]
    }
    // 取模， 计算出校验码所在 idCardY 数组的位置
    let idCardMod = idCardWiSum % 11

    // 截取身份证最后一位
    let idCardLast = identityCard.slice(-1)

    // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
    // 当最后一位是 x 或者 X时，转为大写后比较
    if (idCardMod === 2) {
      return idCardLast.toUpperCase() === idCardY[idCardMod]
    }
    if (idCardLast === idCardY[idCardMod]) {
      return true
    }
  }
  // 忽略15位身份证
  return false
}
