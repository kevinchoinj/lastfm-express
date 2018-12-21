import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';

class SimilarOfCurrent extends React.Component{

  getSimilarOfTrack = (trackName, trackArtist) => {
    this.props.lastfmActions.requestSimilarTracks(trackName, trackArtist);
  }

  render(){
    let {
      currentSimilar,
    } = this.props;
	  return(
			<div>
        <br/><br/>
        <strong>Similar of Current Track</strong>
        {currentSimilar.length > 2 ? currentSimilar.map((value, key)=>(
          <div key={key} onClick={()=>this.getSimilarOfTrack(value.name, value.artist.name)}>
            {value.artist.name} - {value.name}
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

