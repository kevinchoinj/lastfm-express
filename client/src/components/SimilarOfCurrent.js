import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import * as lastfmActions from 'actions/lastfm';
import {siteRoutes} from 'data/siteRoutes';
import {
  selectCurrentTrackName,
  selectCurrentTrackArtistText,
  selectCurrentSimilar,
} from 'reducers';

import placeholder from 'media/lastfm.png';

const TrackBlock = ({trackValues}) => {
  let trackImage;
  let trackArtist;
  let trackName;

  trackName = trackValues.name;
  if (trackValues.image) {
    trackImage = trackValues.image[2]['#text'];
  }
  if (trackValues.artist) {
    trackArtist = trackValues.artist.name;
  }
  return (
    <div className="current_inner">
      <Link to={`${siteRoutes.similar}/${trackArtist}/${trackName}`}>
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
};

const TrackImage = ({trackImage, trackName}) => {
  if (trackImage.length>1) {
    return (
      <img src={trackImage} className="similar_image" alt={trackName}/>
    );
  }
  else {
    return (
      <img src={placeholder} className="similar_image" alt={trackName}/>
    );
  }
};

class SimilarOfCurrent extends React.Component{

  render(){
    const {
      currentSimilar,
      artist,
      name,
    } = this.props;

    return(
      <div className="grid_container">
        <div className="similar_first">
          <div
            className="grid_close"
          >
            <Link to={siteRoutes.home}>
              <FontAwesome name="times"/>
            </Link>
          </div>
          <div className="current_overlay">
            <strong>
              {artist}
            </strong>
            <br/>
            {name}
          </div>
        </div>
        {currentSimilar && currentSimilar.length ? currentSimilar.map((value, key)=>(
          <div key={key}>
            <TrackBlock
              trackValues = {value}
            />
          </div>
        )
        ):
          <div className="warning_message">
            No Similar Tracks Found
          </div>
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    currentSimilar: selectCurrentSimilar(state),
    name: selectCurrentTrackName(state),
    artist: selectCurrentTrackArtistText(state),
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(SimilarOfCurrent);
