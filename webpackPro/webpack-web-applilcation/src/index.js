
function component () {
    var element = document.createElement('div');
    element.innerHTML = join(['Hello','webpack'],' ');

    map([4, 8], function(n){
        console.log(n*n)
    });
    document.body.appendChild(element)
    return element;
}

component()


if ('serviceWorker' in navigator) {
    console.log(11111111)
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('SW registered:',registration)
        })
        .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        })
    })
}