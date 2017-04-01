import React, { Component } from 'react';
import logo from './logo.svg';
import { firebase } from './utils/firebase.js';
import './App.css';
import Search from './components/Search';

class App extends Component {

  render() {
    let children = this.props.children
    return (
      <div className="App">
            <Search />
      { children }
      </div>
    );
  }
}

export default App;
