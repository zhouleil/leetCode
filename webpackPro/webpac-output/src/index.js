import printMe from './print.js'
import { cube } from './math.js'


async function getComponent() {
    let element = document.createElement('div');
    const {default: _} = await import(/* webpackChunkName: "lodash" */ 'lodash');

    let pre = document.createElement('pre');
    let btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    pre.innerHTML = "4 cubed is eaual to " + cube(4);

    btn.innerHTML = "Click me and check the console";
    btn.onclick   = printMe;

    element.appendChild(btn);
    element.appendChild(pre)

    return element
}

getComponent().then(component => {
    document.body.appendChild(component);
})


if (module.hot) {
    module.hot.accept('./print.js',function() {
        console.log("Accepting the updated printMe module");
        document.body.removeChild(element);
        getComponent().then(component => {
            document.body.appendChild(component);
        })
    })
}