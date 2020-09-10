import './bar'

const ary = [1, 2, 3]

const ary1= [...ary]

const isInAry = (num, ary) => {
  return ary.includes(num)
}

const isIn = isInAry(1, ary1)

console.log(isIn)

Promise.resolve(1).then((res) => {
  console.log(res)
})
