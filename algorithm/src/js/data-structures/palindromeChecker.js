/**
 * 利用双端队列检查字符串是否为回文。
 * 回文是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam 或 racecar
 */
const Deque = require('./Double-ended-queue');

function palindromeChecker(aString) {
    if (
        aString === undefined || aString === null ||
        (aString !== null && aString.length === 0)
       )  {
        return false;
    }

    const deque = new Deque();
    const lowerString = aString.toLocaleLowerCase().split(' ').join('');
    let isEqual = true;
    let firstChar,lastChar;

    for (let i = 0; i < lowerString.length; i++) {
        deque.addBack(lowerString.charAt(i));
    }

    while(deque.size() > 1 && isEqual) {
        firstChar = deque.removeFront();
        lastChar = deque.removeBack();
        if (firstChar !== lastChar) {
            isEqual = false;
        }
    }
    return isEqual;
}

console.log('a', palindromeChecker('a'))
console.log('aa', palindromeChecker('aa'))
console.log('kayak', palindromeChecker('kayak'))
console.log('level', palindromeChecker('level'))
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a caror a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));


/**
 * https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
 * js 任务
 */