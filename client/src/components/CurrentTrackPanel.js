import React from "react";
import {connect} from 'react-redux';
import placeholder from 'media/lastfm.png';

const CurrentImage = ({image, name}) => {
  if (image.length>1){
    return (
      <img src={image} className="current_image" alt="name"/>
    )
  }
  else {
    return (
      <img src={placeholder} className="current_image" alt="name"/>
    )
  }
}

class CurrentTrackPanel extends React.Component{

  render(){
    let {
      currentTrack,
    } = this.props;

    let artist;
    let name;
    let image;

    name = currentTrack.name;
    if (currentTrack.artist) {
      artist = currentTrack.artist["#text"];
    }
    if (currentTrack.image) {
      image = currentTrack.image[currentTrack.image.length - 1]['#text'];
    }

	  return(
        <div className="current_wrapper">
          <div className="current_container">
          {currentTrack.artist?
            <div className="current_inner">
              <CurrentImage
                image={image}
                name={name}
              />
              <div className="current_overlay">
               <strong>{artist}</strong>
               <br/>
               {name}
              </div>
            </div>
            :
            <div>
              Loading...
            </div>
          }
        </div>
      </div>
	  );
  }
}

export default connect(
  (state, ownProps) => ({
    currentTrack: state.lastfm.currentTrack,
  }),
  dispatch => ({
  }),
)(CurrentTrackPanel);

