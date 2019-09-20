/**
 * 防抖:触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
 * 思路:每次触发事件时都取消之前的延时调用方法
 * @param {Function} fn 
 */
const debounce = (fn) => {
    let timeout = null;
    return function() {
        clearInterval(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, 500);
    }
}

function sayHi() {
    console.log('防抖成功');
}
let inp = document.getElementById('inp');
inp.addEventListener('input', debounce(sayHi));

/**
 * 节流:高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
 * 思路:每次触发事件时都判断当前是否有等待执行的延时函数 
 * @param {Function} fn 
 */
const throttle = (fn) => {
    let canRun = true;
    return function() {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this,arguments);
            canRun = true;
        }, 500);
    }
}
function sayHii(e) {
    console.log(e.target.innerWidth, e.target.innerHeight)
}

window.addEventListener('resize', throttle(sayHi));