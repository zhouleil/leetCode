import React , { Component } from 'react';
import config from './config.json';

class Greeter extends Component {
    render() {
       return (
        <div className="hello">
            <h1>Hello, world!</h1>
            <p>{config.greetText}</p>       
        </div>
       );
    }
}


export default  Greeter  