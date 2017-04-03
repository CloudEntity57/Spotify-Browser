import React, { Component } from 'react';
import logo from './logo.svg';
import { firebase } from './utils/firebase.js';
import './App.css';
import Search from './components/Search';
import Image from './components/Image';
import Header from './components/Header';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      running:true
    }
  }
  // fixResults(){
  //   console.log('fixing');
  //   let p = this.refs.children;
  //   p.className += "absolute";
  // }
  render() {
    let children = this.props.children;
    let pic = (this.state.pic) ? this.state.pic : '';
    console.log('pic in render: ',pic);
    return (
      <div className="App">
        {/* <Header /> */}

        <div>
          {/* <div className="row">
            <div className="col-sm-12"> */}
              <Search />
            {/* </div>
          </div> */}
          <div className="main-app row">
            <div ref="children col-sm-12">
            { children }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
