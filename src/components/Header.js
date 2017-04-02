import React, { Component } from 'react';
import jQuery from 'jquery';

class Header extends Component{
  render(){
    return(
      <header className="hidden-xs">
        <div className="wrapper">
          <div className="site-title">
            Search Spotify
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
