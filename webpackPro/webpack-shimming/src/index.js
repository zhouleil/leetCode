
function component () {
    var element = document.createElement('div');
    element.innerHTML = join(['Hello','webpack'],' ');

    map([4, 8], function(n){
        console.log(n*n)
    });
    return element;
}

var modernBrowser = ('fetch' in window && 'assign' in Object);
if (!modernBrowser) {
    var scriptElement  = document.createElement('script');
    scriptElement.async = false;
    scriptElement.src = './polyfills.bundle.js';
    document.head.appendChild(scriptElement);
}

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => {
    console.log(response)
  return  response.json()
})
.then(json => {
    console.log('We retrieved some data!/\r/\t')
    console.log(json)
})
document.body.appendChild(component())