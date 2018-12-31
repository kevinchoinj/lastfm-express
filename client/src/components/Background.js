import React from 'react';
import {connect} from 'react-redux';

class Background extends React.Component{
  render(){
    const {
      artistImage,
    } = this.props;

    return(
      <div className="background__wrapper">
        <div className="background__container">
          <img src={artistImage} className="background__object" alt="background overlay" />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    const currentArtist = state.lastfm.currentArtist;
    let artistImage;

    if (currentArtist.image) {
      artistImage = currentArtist.image[currentArtist.image.length - 1]['#text'];
    }

    return {
      artistImage,
    };

  },
)(Background);
