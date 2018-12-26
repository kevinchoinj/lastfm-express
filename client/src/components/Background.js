import React from 'react';
import {connect} from 'react-redux';

class Background extends React.Component{
  render(){
    let {
      currentArtist,
    } = this.props;

    let artistImage;

    if (currentArtist.image) {
      artistImage = currentArtist.image[currentArtist.image.length - 1]['#text'];
    }

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
  (state, ownProps) => ({
    currentArtist: state.lastfm.currentArtist,
  }),
  dispatch => ({
  }),
)(Background);
