import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';
import Scrollbar from 'smooth-scrollbar';
import SimilarOfCurrent from 'components/SimilarOfCurrent';

class SimilarOfCurrentPanel extends React.Component{
  componentDidMount() {
		Scrollbar.init(document.querySelector('#current_similar_panel'), {
			alwaysShowTracks: true,
			syncCallbacks: true,
    });
  }

  render(){
    return(
        <div className="similar_current__container">
          <div className="similar_current__content" id="current_similar_panel">
            <SimilarOfCurrent/>
          </div>
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
)(SimilarOfCurrentPanel);
