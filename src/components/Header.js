import React, { Component } from 'react';
import jQuery from 'jquery';

class Header extends Component{
  render(){
    return(
      <header className="hidden-xs">
        <div className="wrapper">
          <span className="site-title">
            Search Spotify
          </span>
          <span className="site-subtitle">
            &nbsp; by Josh Foster
          </span>
        </div>
      </header>
    )
  }
}

export default Header;
