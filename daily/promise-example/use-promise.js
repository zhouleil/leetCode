const PromisePolyfill = require('./promisePolyfill.js')

var p = new PromisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 200);
}).then(res => {
  console.log('res', res)
})

console.log('p', p)
