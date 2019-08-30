import './assets/style/sass/global';

let a = _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });
console.log(a);

const arr = [1,2,3,4,1];

const chunkArr = function(arr) {
    return _.chunk(arr,2);
}

const delay = function(fn, delayTime) {

    let inv = setTimeout(() => {
        inv = null;
        fn(new Error('Timeout'))
    }, delayTime);
    
    return function () {
        if (inv) {
            // console.log(fn, 'delay')
            // console.log(Array.from(arguments),'arguments')
            clearTimeout(inv);
            return fn.apply(this, arguments);
        }
    }
}

const axios = function (fn ,arr) {
    return new Promise(function(resolve,reject) {
        setTimeout(() => {
            let res = fn(arr);
            res ?  resolve(res) : reject(new Error('Timeout'));
        },2000)
    })
}
const fn = async function(arr) {
    try {
        let res = await axios(delay(chunkArr,3000),arr);
        console.log(res, 'res')

    } catch (err) {
        console.log(err,'fn err')
    }
}
fn(arr)

// console.log(delay(chunkArr,3000)(arr))

console.log('_.difference',_.difference([3, 4, 2 ,5, 1], [4, 2]))
console.log('_.drop([1, 2, 3])', _.drop([1, 2, 3,4]))

var users = [
    { 'user': 'barney',  'active': true },
    { 'user': 'fred',    'active': false },
    { 'user': 'pebbles', 'active': false }
];
console.log('_.dropRightWhile', _.dropRightWhile(users, function(o) { return !o.active; }))

console.log('_.fromPairs', _.fromPairs([['fred', 30], ['barney', 40], ['herry', 50 ]]))

console.log('_.sortedIndexOf', _.sortedIndexOf([4, 5, 5, 5, 6], 5))