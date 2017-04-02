import React, { Component } from 'react';
import jQuery from 'jquery';
import Search from './Search';
import { hashHistory } from 'react-router';
import Image from './Image';

class Results extends Component{
  constructor(props){
    super(props);
    this.state={
      albums:'',
      comp:'',
      displaying:false
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
        let first = val.items[0].name;
        console.log('this.state.first: ',this.state.first);
        console.log('first: ',first);
          if((first !== this.state.first)){
            this.setState({
              albums:albums,
              first:first,
              artist:val.items[0].artists[0].name,
              artistid:params.id,
              photo: val.items[0].images[0].url,
              displaying:true
            });
      };
    });
    request.fail(( err) =>{
      let albums = '';
      this.setState({
        albums:albums,
        first:'',
        artist:albums[0].artists[0].name,
        displaying:false
      });
    });
  }else{
    this.setState({
      albums:'',
      displaying:false
    });
  }
}
componentDidMount(){
  let params=this.props.params;
  console.log('params: ',params);
}
  shouldComponentUpdate(){
    let first = this.props.location.pathname;
      this.setState({
        first:first
      });
    return true;
  }
  componentDidUpdate(){

    let params = this.props.params;
    console.log('params: ',params);
    if(params.hasOwnProperty('name')){
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
        let first = val.items[0].name;
        console.log('this.state.first: ',this.state.first);
        console.log('first: ',first);
          if((first !== this.state.first)){
            this.setState({
              albums:albums,
              first:first,
              artist:val.items[0].artists[0].name,
              artistid:params.id,
              displaying: true,
              photo: val.items[0].images[0].url
            });
          };
    });
  }
}
  viewAlbum(e){
    e.preventDefault();
    console.log('album clicked: ',e.target.id);
    let albumid = e.target.id;
    let artistid = this.state.artistid;
    hashHistory.push('/album/'+albumid+'/'+artistid);
    this.refs.albumresults.innerHTML='';
  }
  render() {
    let params = this.props.params;
    let albums = this.state.albums;
    let imageUrl = (this.state.imageUrl) ? this.state.imageUrl : '';
    console.log('render pic: ',imageUrl);
    let artist = (this.state.artist) ? this.state.artist : '';
    let results_title = (this.state.displaying) ? (
      <h3> Albums by { artist }</h3>
    ) : '';
    if(!params.hasOwnProperty('name')){
      albums='';
    }
    let image = (this.props.params.id) ? <Image img={this.state.artist}/> : '';
    return (
      <div className="album-component">
        <div className="row">
          <div className="col-sm-6">
            {/* <Image img={artist}/> */}
            { image }
          </div>
          <div className="col-sm-6">
            <ul ref="albumresults" className="album-results">
              { results_title }
              { albums }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
