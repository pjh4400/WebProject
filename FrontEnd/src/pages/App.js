import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, About, Board, Join, Login, PostBoard, Gallery, PostGallery, Message } from './index.js';

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home}/>
            <Route exact path="/join" component={Join}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/gallery" component={Gallery}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/board" component={Board}/>
            <Route exact path="/postBoard" component={PostBoard}/>
            <Route exact path="/postGallery" component={PostGallery}/>
            <Route exact path="/msg" component={Message}/>
        </BrowserRouter>
    );
}

export default App; 