import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';
import * as transitionActions from 'actions/transition';
import placeholder from 'media/lastfm.png';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';
import {history} from 'store';
import FontAwesome from 'react-fontawesome';

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

  closePanel = () => {
    this.props.transitionActions.removePreviousContent(siteRoutes.similar + '/' + this.props.currentPath.artist + '/' + this.props.currentPath.name);
    history.push(siteRoutes.home);
  }

  render(){
    let {
      selectedSimilar,
      currentPath,
    } = this.props;

    return(
      <div className="grid_container">
          <div className="current_inner">
            <div
              onClick={()=>this.closePanel()}
              className="grid_close"
            >
              <FontAwesome name="times"/>
            </div>
            <div className="current_overlay">
              <strong>{currentPath.artist}</strong>
              <br/>
              {currentPath.name}
            </div>
          </div>
          {selectedSimilar && selectedSimilar.length ? selectedSimilar.map((value, key)=>(
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
    selectedSimilar: state.lastfm.selectedSimilar,
    currentPath: state.panels.currentPath,
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
    transitionActions: bindActionCreators(transitionActions, dispatch),
  }),
)(SimilarOfCurrent);
