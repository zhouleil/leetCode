
import { 
    forEachObject , 
    unless , 
    times , 
    sortBy,
    tap,
    unary,
    once,
    arrayUtils
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
