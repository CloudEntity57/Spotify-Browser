import React, { Component } from 'react';
import jQuery from 'jquery';
import moment from 'moment';

class Album extends Component{
  constructor(props){
    super(props);
    this.state={
      album:{}
    }
  }
  componentWillMount(){
    console.log('will mount');
    let params = this.props.params;
    console.log('album in component: ',params.id);
    console.log('mounting');
    let albumid = params.id;
    this.showAlbum(albumid);
  }
  showAlbum(id){
    let albumid = id
    let spotify_str = "https://api.spotify.com/v1/albums/"+albumid;
    // console.log('search string: ',api_top10_search_str);
    let request = jQuery.ajax({
      url:spotify_str,
      method:'GET'
    });
    request.done((album)=>{
      console.log('full album info: ',album);
      this.setState({
        album:album,
        artist:album.artists[0].name
      });
    });
  }
  componentDidMount(){
    let artistid=this.props.params.artist;
    console.log('artist: ',artistid);
    artistid = artistid.replace(/ /g,'%20');
    let spotif_str = "https://api.spotify.com/v1/artists/"+artistid+"/albums?&limit=50&market=US";
    console.log('search string: ',spotif_str);
    let req = jQuery.ajax({
      url:spotif_str,
      method:'GET'
    });
    req.done((val)=>{
      let albums = val.items;
      albums = albums.filter((val)=>{
        if(val.album_type == "album"){
          return val;
        }
      });
      console.log('our list of albums: ',albums);
      let first = val.items[0].name;
      console.log('this.state.first: ',this.state.first);
      console.log('first: ',first);
      this.setState({
        albums:albums
      });
    });
  }
  navigateLeft(e){
    e.preventDefault();
    let albums=this.state.albums;
    let albumIds=albums.map((val)=>{
      return val.id;
    });
    let album=this.state.album;
    let albumindex=albumIds.indexOf(album.id);
    console.log('albumindex: ',albumindex);
    if(albumindex == 0){
      albumindex = albumIds.length;
    }
    let newAlbum = albums[albumindex-1];
    console.log('new album: ',newAlbum);
    let id = newAlbum.id;
    this.showAlbum(id);
  }
  navigateRight(e){
    e.preventDefault();
    let albums=this.state.albums;
    let albumIds=albums.map((val)=>{
      return val.id;
    });
    let album=this.state.album;
    let albumindex=albumIds.indexOf(album.id);
    console.log('albumindex: ',albumindex);
    if(albumindex == albumIds.length-1){
      albumindex = -1;
    }
    let newAlbum = albums[albumindex+1];
    console.log('new album: ',newAlbum);
    let id = newAlbum.id;
    this.showAlbum(id);
  }
  showTrack(e){
    e.preventDefault();
    let $allTracks = jQuery(".preview-track");
    jQuery.each($allTracks, (index,val)=>{val.pause()});
    // $allTracks[0].pause();
    $allTracks.hide(400);
    // console.log('target: ',e.target.id);
    let id = e.target.id;
    let $audio = jQuery("#"+id).siblings('audio');
    console.log('audio: ',$audio);
    $audio.show(400);
  }
  // hideTracks(e){
  //   e.preventDefault();
  //   let $allTracks = jQuery(".preview-track");
  //   $allTracks.hide(400);
  // }
  render(){
    let title,artist,url,tracks,year,length,audio;
    let album = this.state.album;
    console.log('album in render: ',album);
    if(album.hasOwnProperty('name') && album.album_type=='album'){
      title= album.name;
      artist = album.artists[0].name;
      year = album.release_date.slice(0,4);
      console.log('year: ',year);
      url = album.images[1].url;
      tracks = album.tracks.items.map((val)=>{
        let track_length = moment(val.duration_ms).format("m:ss");
        audio=val.preview_url;
        // console.log('track: ',audio);
        return(
          // <li className="track"><span>{ val.name }</span><span>{track_length}</span></li>
          <li className="track">
            <span>
              <div id={val.id} onClick={this.showTrack.bind(this)} className="fa fa-play-circle-o">&nbsp;</div>
                <audio className="preview-track" controls src={audio}>
                </audio>
               { val.name }

            </span>

          <span>{track_length}</span></li>

        );
      });
    }
    return(
      <div>
        <div className="results-wrapper">
          <div className="album-info">
            <div>
              <div className="album-toggle">
                <a className="album-arrow" href="#"><div className="fa fa-arrow-left" onClick={this.navigateLeft.bind(this)}></div></a>
                <img src={url} alt={title} />
                <a className="album-arrow" href="#"><div className="fa fa-arrow-right" onClick={this.navigateRight.bind(this)}></div></a>
              </div>
              <h3>{title} - {artist}</h3>
            </div>
            <div><h4>{ year }</h4></div>
            <div className="container">
              <ol className="tracks">
                { tracks }
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Album;
