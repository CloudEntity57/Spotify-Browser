import React, { Component } from 'react';
import jQuery from 'jquery';

class Album extends Component{
  constructor(props){
    super(props);
    this.state={
      album:{}
    }
  }
  componentWillMount(){
    let params = this.props.params;
    console.log('album in component: ',params.id);
    console.log('mounting');
    let albumid = params.id;
    let spotify_str = "https://api.spotify.com/v1/albums/"+albumid;
    // console.log('search string: ',api_top10_search_str);
    let request = jQuery.ajax({
      url:spotify_str,
      method:'GET'
    });
    request.done((album)=>{
      console.log('full album info: ',album);
      this.setState({
        album:album
      });
    });
  }
  render(){
    let title,artist,url,tracks,year,length;
    let album = this.state.album;
    console.log('album in render: ',album);
    if(album.hasOwnProperty('name')){
      artist = album.artists[0].name;
      title = album.name;
      year = album.release_date.slice(0,4);
      console.log('year: ',year);
      url = album.images[1].url;
      tracks = album.tracks.items.map((val)=>{
        return(
          <li>{ val.name }</li>
        );
      });
    }
    return(
      <div>
        <div className="results-wrapper">
          <div className="album-info">
            <img src={url} alt={title} />
            <div>{title} - {artist}</div>
            <div>{ year }</div>
            <ol className="tracks">
              { tracks }
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Album;
