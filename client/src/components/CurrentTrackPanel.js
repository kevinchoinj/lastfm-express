import React from "react";
import {connect} from 'react-redux';

class CurrentTrackPanel extends React.Component{

  render(){
    let {
      currentTrack,
    } = this.props;
	  return(
        <div className="current_wrapper">
          <div className="current_container">
          {currentTrack.artist?
            <div>
              {currentTrack.artist["#text"]} - {currentTrack.name}
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

