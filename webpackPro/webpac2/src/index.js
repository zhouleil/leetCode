import React from 'react';
import { render } from 'react-dom';
import Greeter from './conponents/Greeter';
import './assets/style/scss/style.scss';


render(
    <Greeter />,
    document.getElementById('root')
)