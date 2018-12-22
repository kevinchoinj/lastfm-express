import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';

class TestButton extends React.Component{

  testAction = () => {
    this.props.lastfmActions.requestCurrentTrackThenSimilar();
  }

  render(){

    let {
      currentTrack,
    } = this.props;

	  return(
			<div onClick={()=>this.testAction()}>
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

	  );
  }
}

export default connect(
  (state, ownProps) => ({
    currentTrack: state.lastfm.currentTrack,
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(TestButton);

