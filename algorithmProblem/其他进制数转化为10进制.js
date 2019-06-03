
/**
 * 
 * @param {number, string} num 
 * @param {number} numType
 * @return {number} TenNumber
 */
function transToTen (num, numType) {
    var tenNumber = 0;
    var numStr = new String(num);
    var numArr = numStr.split('');
    var numLength = numStr.length;
    for (var i = 0; i < numLength; i++) {
        var itemNum = numArr[i];
        if (numType === 16) {
            switch (itemNum) {
                case 'A' : 
                    itemNum = 10;
                    break;
                case 'B' : 
                    itemNum = 11;
                    break;
                case 'C' : 
                    itemNum = 12;
                    break;    
                case 'D' : 
                    itemNum = 13;
                    break;   
                case 'E' : 
                    itemNum = 14;
                    break;   
                case 'F' : 
                    itemNum = 15;
                    break;   
            }
        }
        tenNumber += itemNum * Math.pow(numType, numLength - (i + 1));
    }
    return tenNumber;
}

transToTen(111,2)

/**
 * 十进制数转化为其他进制
 * @param {number} num 
 * @param {number} numType 
 * @return {number} otherNum
 */
function tenBinaryToOthers (num, numType) {
    
}