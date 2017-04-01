import React, { Component } from 'react';
import jQuery from 'jquery';
import Search from './Search';
import { hashHistory } from 'react-router';

class Results extends Component{
  constructor(props){
    super(props);
    this.state={
      albums:'',
      comp:''
    }
  }
  componentWillMount(){
    let params = this.props.params;
    console.log('params: ',params);
    if(params.hasOwnProperty('name')) {
      let artistname = params.name;
      let artistid = params.id;
      console.log('artist id: ',artistid);
      let spotify_str = "https://api.spotify.com/v1/artists/"+artistid+"/albums?&limit=50&market=US";
      // console.log('search string: ',api_top10_search_str);
      console.log('search string: ',spotify_str);
      let request = jQuery.ajax({
        url:spotify_str,
        method:'GET'
      });
      request.done((val)=>{
        let albums = val.items;
        console.log('our entire list of choices: ',val);
        console.log('our list of albums: ',albums);
        albums = albums.map((val)=>{
          return(
            <a href="#" onClick={this.viewAlbum.bind(this)} ><li id={val.id}>{val.name}</li></a>
          );
        });
        console.log('jsx: ',albums);
        // console.log('this.state.albums: ',this.state.albums);
        let previous = this.props.location.pathname;
        console.log('prev: ',previous);
        let path = '/results/'+params.name+'/'+params.id;
        // let first = albums[0].props.children;
        let first = val.items[0].name;
        // let comp=this.state.comp;
        console.log('this.state.first: ',this.state.first);
        console.log('first: ',first);
        console.log('path: ',path);
          if((first !== this.state.first)){
            this.setState({
              albums:albums,
              first:first,
              artist:val.items[0].artists[0].name
            });
      };
    });
    request.fail(( err) =>{
      let albums = '';
      this.setState({
        albums:albums,
        first:'',
        artist:albums[0].artists[0].name
      });
    });
  }
}
  shouldComponentUpdate(){
    let first = this.props.location.pathname;
      this.setState({
        first:first
      });
    return true;
  }
  componentWillUpdate(){
    let params = this.props.params;
    console.log('params: ',params);
    if(params.hasOwnProperty('name')) {
      let artistname = params.name;
      let artistid = params.id;
      console.log('artist id: ',artistid);
      let spotify_str = "https://api.spotify.com/v1/artists/"+artistid+"/albums?&limit=50&market=US";
      // console.log('search string: ',api_top10_search_str);
      console.log('search string: ',spotify_str);
      let request = jQuery.ajax({
        url:spotify_str,
        method:'GET'
      });
      request.done((val)=>{
        let albums = val.items;
        console.log('our list of albums: ',albums);
        albums = albums.map((val)=>{
          return(
            <a href="#" onClick={this.viewAlbum.bind(this)} ><li id={val.id}>{val.name}</li></a>
          );
        });
        console.log('jsx: ',albums);
        // console.log('this.state.albums: ',this.state.albums);
        let previous = this.props.location.pathname;
        console.log('prev: ',previous);
        let path = '/results/'+params.name+'/'+params.id;
        // let first = albums[0].props.children;
        let first = val.items[0].name;
        // let comp=this.state.comp;
        console.log('this.state.first: ',this.state.first);
        console.log('first: ',first);
        console.log('path: ',path);
          if((first !== this.state.first)){
            this.setState({
              albums:albums,
              first:first,
              artist:val.items[0].artists[0].name
            });
      };
    });
    request.fail(( err) =>{
      let albums = '';
      this.setState({
        albums:albums,
        first:''
      });
    });
  }
}
  viewAlbum(e){
    e.preventDefault();
    console.log('album clicked: ',e.target.id);
    let albumid = e.target.id;
    hashHistory.push('/album/'+albumid);
    this.refs.albumresults.innerHTML='';
  }
  render() {
    let params = this.props.params;
    let albums = this.state.albums;
    let artist = this.state.artist;
    let results_title = (
    <h3> Albums by { artist }</h3>
    )
    if(!params.hasOwnProperty('name')){
      albums='';
    }

    return (
      <div className="album-component">
        <div className="results-wrapper">

          <ul ref="albumresults" className="album-results">
            { results_title }
            { albums }
          </ul>
        </div>
      </div>
    );
  }
}

export default Results;
