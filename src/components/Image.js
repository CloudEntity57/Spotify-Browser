import React, { Component } from 'react';
import jQuery from 'jquery';

class Image extends Component{
  constructor(props){
    super(props);
    this.state={
      showing:false,
      current:''
    }
  }
  componentDidUpdate(){
    let result = this.props.img.toLowerCase();
    let spotify_str = "https://api.spotify.com/v1/search/?q="+result+"*&type=artist";
    let pic = jQuery.get(
    spotify_str,(val)=>{
      let artistphoto = (val.artists.items) ? val.artists.items[0].images[0].url : '';
      console.log('artist photo:',);
      if(this.state.current !==artistphoto){
          this.setState({
            pic:artistphoto,
            current:artistphoto,
            showing:true
          });
        }
      });
  }
  render(){
    let pic = (this.state.pic) ? this.state.pic : '';
    return(
      <div className="artist-pic-component">
        <img className="img-responsive" src={pic} alt="artist pic" />
      </div>
    )
  }
}

export default Image;
