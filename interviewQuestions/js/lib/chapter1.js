/**
 * 防抖:触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
 * 思路:每次触发事件时都取消之前的延时调用方法 
 */
 
 /*
 * @param {*} fn
 * @param {*} delay 
 */
var debounce = function (fn, delay) {
  var timer = null;
  return function (...rest) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(fn.bind(this, ...rest), delay);
  }
}

```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <script>
    var createDiv = function (text) {
      var div = document.createElement('div');
      div.innerHTML = text;
      document.body.appendChild(div);
    }
    for (var i = 0; i < 50; i++) {
      createDiv("我的第" + i + "个div")
    }
  </script>

  <script>
    var debounce = function (fn, wait) {
      var timer = null;
      return function (...rest) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timer = setTimeout(fn.bind(this, ...rest), wait);
      }
    }
    var handle = function (e) {
      console.log(e)
    }
    window.addEventListener('scroll', debounce(handle, 200));
  </script>
</body>
</html>

```

/**
 * 节流:高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
 * 思路:每次触发事件时都判断当前是否有等待执行的延时函数 
 */


/**
 * 节流，定时器方式
 * @param {*} fn 
 * @param {*} delay 
 */
var throttle = function (fn, delay) {
  var timer = null;
  return function (...rest) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(this, rest);
    }, delay);
  }
}

/**
 * 节流，时间戳方式
 * @param {*} fn 
 * @param {*} delay 
 */
var throttle = function (fn, delay) {
  var prev = Date.now();
  return function (...rest) {
    var curr = Date.now();
    if (delay - (curr - prev) <= 0) {
      fn.apply(this, rest);
      prev = Date.now();
    }
  }
}

/**
 * 节流， 定时器和时间戳组合方式
 * @param {*} fn 
 * @param {*} delay 
 */
var throttle = function (fn, delay) {
  var timer = null;
  var startTime = Date.now();
  return function (...rest) {
    var currTime = Date.now();
    var remaining = delay - (currTime - startTime);
    clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(this, rest);
      startTime = Date.now();
    } else {
      timer = setTimeout(() => {
        fn.apply(this, rest);
        startTime = Date.now();
      }, remaining);
    }
  }
}

```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <script>
    var createDiv = function (text) {
      var div = document.createElement('div');
      div.innerHTML = text;
      document.body.appendChild(div);
    }
    for (var i = 0; i < 50; i++) {
      createDiv("我的第" + i + "个div")
    }
  </script>

  <script>
    var throttle = function (fn, delay) {
      var timer = null;
      var startTime = Date.now();
      return function (...rest) {
        var currTime = Date.now();
        var remaining = delay - (currTime - startTime);
        console.log(remaining)
        clearTimeout(timer);
        if (remaining <= 0) {
          fn.apply(this, rest);
          startTime = Date.now();
        } else {
          timer = setTimeout(() => {
            fn.apply(this, rest);
            startTime = Date.now();
          }, remaining);
        }
      }
    }
    var handle = function (e) {
      console.log(e)
    }
    window.addEventListener('scroll', throttle(handle, 1000));
  </script>
</body>
</html>

```


// https://www.cnblogs.com/youma/p/10559331.html
