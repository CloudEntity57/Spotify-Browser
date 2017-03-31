import React, { Component } from 'react';
import jQuery from 'jquery';
import Search from './Search';

class Results extends Component{
  constructor(props){
    super(props);
    this.state={
      albums:'',
      comp:''
    }
  }
  shouldComponentUpdate(){
    let path = this.props.location.pathname;
      this.setState({
        path:path
      });
    return true;
  }
  componentWillUpdate(){
    let params = this.props.params;
    console.log('params: ',params);
    if(params) {
      let artistname = params.name;
      let artistid = params.id;
      console.log('artist id: ',artistid);
      let spotify_str = "https://api.spotify.com/v1/artists/"+artistid+"/albums";
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
            <li>{val.name}</li>
          );
        });
        console.log('jsx: ',albums);
        // console.log('this.state.albums: ',this.state.albums);
        let previous = this.props.location.pathname;
        console.log('prev: ',previous);
        let path = '/results/'+params.name+'/'+params.id;
        let comp = albums[0].props.children;
        // let comp=this.state.comp;
        console.log('this.state.comp: ',this.state.comp);
        console.log('comp: ',comp);
        console.log('path: ',path);
          if((albums[0].props.children !== this.state.path)){
            this.setState({
              albums:albums,
              path:comp
            });
      };
    });
    request.fail(( err) =>{
      let albums = '';
      this.setState({
        albums:albums,
        path:''
      });
    });
  }
}

  render() {
    let params = this.props.params;
    if(!params.hasOwnProperty('name')){
      params='';
    }
    let albums = this.state.albums;
    return (
      <div>
          <Search />
      Results here:
      <ul className="album-results">
        { albums }
      </ul>
      </div>
    );
  }
}

export default Results;
