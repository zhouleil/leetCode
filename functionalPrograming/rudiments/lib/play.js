
import { 
    forEachObject , 
    unless , 
    times , 
    sortBy,
    tap,
    unary,
    once,
    arrayUtils,
    curry,
    curryN,
    partial,
    compose,
    composeN,
    pipe
} from './es6-functional.js';

const { forEach , every , some, map ,filter , concatAll , reduce} = arrayUtils;

/**
 * forEach=================== 
 */
console.log('forEach=======');
let  array = [1, 2 ,3];
forEach(array, (data) => console.log(data));

/**
 * orEachObject=================== 
 */
console.log('forEachObject=======');
let object = {a: 1 , b: 2};
forEachObject(object, (k, v) => console.log(`${k}:${v}`));

/**
 * unless=================== 
 */
console.log('unless=======');
forEach([1,2,3,4,5,6,7], (number) => {
    unless((number % 2), () => {
        console.log(number, 'is even')
    })
});

/**
 * times=================== 
 */
console.log('times=======');
times(100, (n) => {
    unless(n % 2, () => {
        console.log( n , 'is even' )
    })
});
/**
 * every=================== 
 */
console.log('every=======');
console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([4, NaN, NaN], isNaN));


/**
 * sortBy=================== 
 */
console.log('sortBy=======');

let people = [
    { firstName: 'aaFirstName', lastName: 'cclastName'},
    { firstName: 'ccFirstName', lastName: 'aalastName'},
    { firstName: 'bbFirstName', lastName: 'bblastName'},
];

let sortFirstName = people.sort(sortBy('firstName'));
console.log(sortFirstName,'sortFirstName');

let sortLastName = people.sort(sortBy('lastName'));
console.log(sortLastName,'sortLastName');

/**
 * tap=================== 
 */
console.log('tap=======');
tap('fun')((it) => console.log('value is', it));

forEach([1,2,3], (a) => 
    tap(a)( () => 
        {
            console.log(a)
        }
    )
);

/**
 * unary=================== 
 */
console.log('unary=======');
console.log(['1','2','3'].map(parseInt));
console.log(['1','2','3'].map(unary(parseInt)));

/**
 * once=================== 
 */
console.log('once=======');
let doPayment = once(() => {
    console.log("Payment is done")
});
console.log(doPayment());
// 执行第二次
console.log(doPayment());

/**
 * map=================== 
 */
console.log('map|filter=======');
console.log(
    map([1,2,3], (x) => x * x)
);
const apressBooks = [
    {
        "id": 111,
        "title": 'c# 6.0',
        "author": 'ANDREN TROELSEN',
        "rating": [4.7],
        "reviews": [{ good: 4, excellent: 12}]
    },
    {
        "id": 222,
        "title": 'Efficient Learning Machines',
        "author": 'Rahul Khanna',
        "rating": [4.5],
        "reviews": []
    },
    {
        "id": 333,
        "title": 'Pro AngularJs',
        "author": 'Adam Freeman',
        "rating": [4.0],
        "reviews": []
    },
    {
        "id": 444,
        "title": 'Pro ASP.NET',
        "author": 'Adam Freeman',
        "rating": [4.2],
        "reviews": [{ good: 14, excellent: 12}]
    },
];

console.log(
    map(apressBooks , (book) => {
        return { title: book.title, author: book.author}
    })
);

console.log(
    filter(apressBooks, (book) => book.rating[0] > 4.5)
);


console.log(
    map(filter(apressBooks,(book) => book.rating[0] > 4.5), (book) => ({
        title: book.title,
        author: book.author
    }))
)

console.log('concatAll=============');

let reApressBooks = [
    {
        name: "beginners",
        bookDetails: [
            {
                "id": 111,
                "title": 'c# 6.0',
                "author": 'ANDREN TROELSEN',
                "rating": [4.7],
                "reviews": [{ good: 4, excellent: 12}]
            },
            {
                "id": 222,
                "title": 'Efficient Learning Machines',
                "author": 'Rahul Khanna',
                "rating": [4.5],
                "reviews": []
            },
        ]
    },
    {
        name: 'pro',
        bookDetails: [
            {
                "id": 333,
                "title": 'Pro AngularJs',
                "author": 'Adam Freeman',
                "rating": [4.0],
                "reviews": []
            },
            {
                "id": 444,
                "title": 'Pro ASP.NET',
                "author": 'Adam Freeman',
                "rating": [4.2],
                "reviews": [{ good: 14, excellent: 12}]
            },
        ]
    }
];

let bookDetails =   concatAll(
    map(reApressBooks, (book) => {
        return book.bookDetails;
    })
)
console.log(
    bookDetails
);

console.log('===========')
let goodRatingCriteria = (book) => book.rating[0] > 4.5;
console.log(
    filter(
        concatAll(
            map(reApressBooks, (book) => {
                return book.bookDetails;
            })
        ),
        goodRatingCriteria
    )
)

console.log('reduce==========')
let useless = [2,5,6,1,10];
console.log( 
    reduce(useless, (acc, val) => acc + val)
);

console.log( 
    reduce(useless, (acc, val) => acc * val)
);

let bookReviews = reduce(bookDetails, (acc, bookDetail) => {
    let goodReviews = bookDetail.reviews[0] != undefined 
        ? bookDetail.reviews[0].good
        : 0;
    let excellentReviews = bookDetail.reviews[0] != undefined
        ? bookDetail.reviews[0].excellent
        : 0;
    return {
        good: acc.good + goodReviews,
        excellent: acc.excellent + excellentReviews
    }    
}, { good: 0, excellent: 0});

console.log(bookReviews)


console.log('curry==========')
const add = (x, y) => x + y;
let autoCurriedAdd = curry(add);
autoCurriedAdd(2)(2);
// => 4

console.log('curryN==========')
const multiply = (x, y ,z) => x * y * z;
curryN(multiply)(1)(2)(3);
curryN(multiply)(1,2,0);

const match = curryN(function(expr ,str) {
    return str.match(expr);
});
let hasNumber = match(/[0-9]+/);
let filtert = curryN(function(f ,arr) {
    return arr.filter(f);
})
let findNumbersInArray = filtert(hasNumber);
console.log(findNumbersInArray(['js', 'number1']));


console.log('partial==========');

let delayTenMs = partial(setTimeout, undefined , 10);
delayTenMs(() => console.log("Do Y task"));

let obj = { foo : 'bar', bar: 'foo'};
JSON.stringify(obj, null , 2);

let prettyPrintJson = partial(JSON.stringify, undefined, null, 2);
prettyPrintJson({ foo: 'bar', bar:'foo'});

console.log('compose==========');
let number = compose(Math.round , parseFloat);
// number = (c) => Math.round(parseFloat(c));    
console.log(number('3.56'));


let filterOutStandingBooks = (book) => book.rating[0] === 5;
let filterGoodBooks = (book) => book.rating[0] > 4.5;
let filterBadBooks = (book) => book.rating[0] < 3.5;

let projectTitleAndAuthor = (book) => { return { author: book.author, title: book.title} };
let projectAuthor = (book) => ({ author: book.author });
let projectTitle = (book) => ({ title : book.title });

let queryGoodBooks = partial(filter, undefined, filterGoodBooks);
let mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor);
let mapTitle = partial(map, undefined, projectTitle);

let titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor, queryGoodBooks);
let titleForGoodBooks = compose(mapTitle, queryGoodBooks);

let titleAndAuthorForBooksInfo = titleAndAuthorForGoodBooks(apressBooks);
let titleForGoodBooksInfo = titleForGoodBooks(apressBooks);

console.log(titleAndAuthorForBooksInfo)
console.log(titleForGoodBooksInfo);

console.log('composeN=======')

let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;
// 判断奇偶
let oddOrEven = (ip) => ip % 2 === 0 ? 'even' : 'odd';

const countWords = compose(count, splitIntoSpaces);
console.log(countWords("Hello your reading about composition"));

const oddOrEvenWords = composeN(oddOrEven, count, splitIntoSpaces);
let oddOrEvenWords1 = composeN(composeN(oddOrEven,count), splitIntoSpaces);
let oddOrEvenWords2 = composeN(oddOrEven,composeN(count,splitIntoSpaces));

console.log('oddOrEvenWords composeN',oddOrEvenWords('hello your reading about composition'));
console.log('oddOrEvenWords1 composeN',oddOrEvenWords1('hello your reading about composition'))
console.log('oddOrEvenWords2 composeN',oddOrEvenWords2('hello your reading about composition'))

const pipeOddOrEvenWords = pipe(splitIntoSpaces,count,oddOrEven);
console.log(pipeOddOrEvenWords('hello your reading about composition'))

