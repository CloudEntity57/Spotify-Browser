import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Search from './components/Search';
import Results from './components/Results';
import Album from './components/Album';
import './index.css';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import dotenv from 'dotenv';
dotenv.config({
  silent:true
});

ReactDOM.render(
  <Router history= { hashHistory }>
    <Route path = "/" component = { App }>
      <IndexRoute component = { Results } />
      <Route path="/results/:name/:id" component = { Results } />
      <Route path="/album/:id" component = { Album } />
    </Route>
  </Router>,
  document.getElementById('root')
);
