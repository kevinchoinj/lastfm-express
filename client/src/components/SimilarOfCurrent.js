import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';
import placeholder from 'media/lastfm.png';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';

const TrackBlock = ({trackValues}) => {
  let trackImage;
  let trackArtist;
  let trackName;

  trackName = trackValues.name;
  if (trackValues.image) {
    trackImage = trackValues.image[3]['#text'];
  }
  if (trackValues.artist) {
    trackArtist = trackValues.artist.name
  }
  return (
    <div className="current_inner">
      <Link to={siteRoutes.similar + '/' + trackArtist + '/' + trackName}>
        <TrackImage
          trackImage = {trackImage}
          trackName = {trackName}
        />
      </Link>
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

  render(){
    let {
      currentSimilar,
    } = this.props;

    return(
      <div className="grid_container">
        <strong>Similar of Current Track</strong>
          {currentSimilar && currentSimilar.length ? currentSimilar.map((value, key)=>(
          <div key={key}>
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
