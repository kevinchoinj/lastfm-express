import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';
import placeholder from 'media/lastfm.png';

const TrackBlock = ({trackValues}) => {
  let trackImage;
  let trackArtist;
  let trackName;

  trackName = trackValues.trackName;
  if (trackValues.image) {
    trackImage = trackValues.image[trackValues.image.length - 1]['#text'];
  }
  if (trackValues.artist) {
    trackArtist = trackValues.artist.name
  }
  return (
    <div className="current_inner">
      <TrackImage
        trackImage = {trackImage}
        trackName = {trackName}
      />
      <div className="current_overlay">
        <strong>{trackArtist}</strong>
        <br/>
        {trackName}
      </div>
    </div>
  );
}

const TrackImage = ({trackImage, trackName}) => {
  if (trackImage.length>1) {
    return (
      <img src={trackImage} className="current_image" alt={trackName}/>
    );
  }
  else {
    return (
      <img src={placeholder} className="current_image" alt={trackName}/>
    );
  }
}

class SimilarOfCurrent extends React.Component{
  getSimilarOfTrack = (trackName, trackArtist) => {
    this.props.lastfmActions.requestSimilarTracks(trackName, trackArtist);
  }

  render(){
    let {
      currentSimilar,
    } = this.props;

    return(
      <div className="grid_container">
        <strong>Similar of Current Track</strong>
          {currentSimilar && currentSimilar.length ? currentSimilar.map((value, key)=>(
          <div
            key={key}
            onClick={()=>this.getSimilarOfTrack(value.name, value.artist.name)}
          >
            <TrackBlock
              trackValues = {value}
            />
          </div>
          )
        ):
        <div> not enough similar tracks to current</div>}
      </div>
	  );
  }
}

export default connect(
  (state, ownProps) => ({
    currentSimilar: state.lastfm.currentSimilar,
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(SimilarOfCurrent);
