import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';

class SimilarOfSelected extends React.Component{

  getSimilarOfTrack = (trackName, trackArtist) => {
    this.props.lastfmActions.requestSimilarTracks(trackName, trackArtist);
  }

  render(){
    let {
      selectedSimilar,
    } = this.props;
	  return(
			<div>
        <br/><br/>
        <strong>Similar of Selected Track</strong>
        {selectedSimilar.length > 2 ? selectedSimilar.map((value, key)=>(
          <div key={key} onClick={()=>this.getSimilarOfTrack(value.name, value.artist.name)}>
            {value.artist.name} - {value.name}
          </div>
          )
        ):
        <div> not enough similar tracks to selected</div>}
      </div>

	  );
  }
}

export default connect(
  (state, ownProps) => ({
    selectedSimilar: state.lastfm.selectedSimilar,
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(SimilarOfSelected);

