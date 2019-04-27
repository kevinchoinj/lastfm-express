import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';
import {history} from 'store';
import FontAwesome from 'react-fontawesome';
import * as lastfmActions from 'actions/lastfm';
import * as transitionActions from 'actions/transition';

import placeholder from 'media/lastfm.png';

import {
  selectSelectedSimilarTracks,
  selectCurrentPathName,
  selectCurrentPathArtist,
  selectCurrentPath,
} from 'reducers';

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

  closePanel = () => {
    this.props.transitionActions.startRemovePreviousContent(
      `${siteRoutes.similar}/${this.props.currentPath.artist}/${this.props.currentPath.name}`
    );
    history.push(siteRoutes.home);
  }

  render(){

    const {
      similarTracks,
      pathName,
      pathArtist,
    } = this.props;

    return(
      <div className="grid_container">
        <div className="similar_first">
          <div
            onClick={()=>this.closePanel()}
            className="grid_close"
          >
            <FontAwesome name="times"/>
          </div>
          <div className="current_overlay">
            <strong>{pathArtist}</strong>
            <br/>
            {pathName}
          </div>
        </div>
        {similarTracks && similarTracks.length ? similarTracks.map((value, key)=>(
          <div key={key}>
            <TrackBlock
              trackValues = {value}
            />
          </div>
        )
        ):
          <div className="warning_message"> No Similar Tracks Found </div>
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    similarTracks: selectSelectedSimilarTracks(state),
    pathName: selectCurrentPathName(state),
    pathArtist: selectCurrentPathArtist(state),
    currentPath: selectCurrentPath(state),
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
    transitionActions: bindActionCreators(transitionActions, dispatch),
  }),
)(SimilarOfCurrent);
