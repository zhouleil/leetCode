const sortFn = function (arr) {
  function sortBy (pre, next, sortArr, index) {
    const { key, type, isLast } = sortArr[index]
    if (pre[key] > next[key]) {
      return type === 'desc' ? -1 : 1
    }
    if (pre[key] < next[key]) {
      return type === 'desc' ? 1 : -1
    }
    if (isLast) {
      return 0
    } else {
      return sortBy(pre, next, sortArr, index + 1)
    }
  }  
  return function (pre, next) {
    const index = 0
    return sortBy(pre, next, arr, index)
  }
}

var a = [
  {
    value: 1,
    day: 1200,
    year: 2019
  },
  {
    value: 5,
    day: 1200,
    year: 2018
  },
  {
    value: 7,
    day: 1100,
    year: 2019
  },  
  {
    value: 6,
    day: 1200,
    year: 2017
  },
  {
    value: 7,
    day: 1200,
    year: 2016
  }
]

var b = a.sort(sortFn([{ key: 'year', type: 'desc', isLast: false }, { key: 'day' , type: 'asc' , isLast: false }, { type: 'value', isLast: true }]))
console.log(b)