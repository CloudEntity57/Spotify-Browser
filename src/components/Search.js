import React, { Component } from 'react';
import jQuery from 'jquery';
import { hashHistory } from 'react-router';

class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      results:null,
      clicked:false,
    }
  }

  searchArtist(e){
    e.preventDefault();
    let artistquery = this.refs.searchbar.value;
    artistquery = artistquery.replace(/ /g,'%20');
    let spotify_str = "https://api.spotify.com/v1/search/?q="+artistquery+"*&type=artist";
    // console.log('search string: ',api_top10_search_str);
    console.log('search string: ',spotify_str);
    let album_art;
    let pic;
    jQuery.ajax({
      url:spotify_str,
      success:(val)=>{
      // var output = JSON.parse(val);
      let results = val.artists.items.map((artist)=>{
        return {
          name:artist.name,
          id:artist.id
        }
      });
      console.log('our list of artists: ',results);
      this.setState({
        results:results,
        clicked:false
      });
    },
    error:()=>{
      this.setState({
        results:''
      });
    }
    });
  }
  handleClick(e){
    e.preventDefault();
    let result = e.target.textContent.toLowerCase();
    let resultid = e.target.id
    console.log('handled id: ',resultid);
    console.log('handled result: ',result);
    this.setState({
      clicked:true
    });
    hashHistory.push('/results/'+result+'/'+resultid);
  }
  submit(e){
    e.preventDefault();
    console.log('submit');
  }
  hideList(){
    console.log('hiding');
    // this.setState({
    //   clicked:true
    // });
  }
  render() {
    let results = (this.state.results && !this.state.clicked) ?
    this.state.results.map((artist)=>{
      return (
        <a href="#"><li id={artist.id} onClick={this.handleClick.bind(this)}> {artist.name}</li> </a>
      );
    })
    : '';
    let dropdownmenu= (this.state.results && this.state.results.length>0 && !this.state.clicked) ?
    ( <div ref="dropdownmenu" className="dropdown-menu results-wrapper">
      <ul ref="artistresults" className="artist-results">
        { results }
      </ul>
    </div>
    )
      : '';
    return (
      <div onBlur={this.hideList.bind(this)} className="App">
        Search for Albums
        <form className="form form-default">
          <div className="artist-searchbar form-group">
            <input onEnter={this.submit.bind(this)} type="text" ref="searchbar" onKeyUp={this.searchArtist.bind(this)} placeholder="Search for an artist" className="form-control"/>
          </div>
          { dropdownmenu }
        </form>
      </div>
    );
  }
}

export default Search;
