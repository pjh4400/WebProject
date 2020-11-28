import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, About, Board, Join, Login } from './index.js';

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home}/>
            <Route exact path="/join" component={Join}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/board" component={Board}/>
        </BrowserRouter>
    );
}

export default App; 