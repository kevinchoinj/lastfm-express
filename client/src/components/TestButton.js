import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';

class TestButton extends React.Component{

  testAction = () => {
    this.props.lastfmActions.requestCurrentTrack();
  }

  render(){
	  return(
			<div onClick={()=>this.testAction()}>
        test
      </div>

	  );
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(TestButton);

