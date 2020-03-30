
const isType = type => value => {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}

const isFunction = isType('Function')

const PromisePolyfill = function (fn) {
  if (!isFunction(fn)) {
    return new Error(' Promise resolver undefined is not a function ')
  }

  const PENDING = 'pending'
  const FULFILLED = 'resolved'
  const REJECTED = 'rejected'
  const _this = this

  this.PromiseStatus = PENDING
  this.PromiseValue = undefined

  const resolveFn = function (newValue) {
    console.log(newValue)
    if (newValue && typeof newValue.then === 'function') {
      //
      return
    }

    _this.PromiseStatus = FULFILLED
    _this.PromiseValue = newValue

    if (_this.PromiseStatus === REJECTED) {
      //
    }
  }

  const rejectFn = function (newValue) {
    if (newValue && typeof newValue.then === 'function') {
      //
      return
    }

    _this.PromiseStatus = FULFILLED
    this.PromiseValue = newValue
  }  

  // 被实例化时立即执行 fn
  try {
    fn(resolveFn, rejectFn)
  } catch (err) {
    _this.rejectFn(err)
  }

  PromisePolyfill.prototype.then = function (resolve, reject) {
    if (this.PromiseStatus === 'FULFILLED') {
      console.log(1)
      return this
    }
    return this
  }
}

module.exports = PromisePolyfill