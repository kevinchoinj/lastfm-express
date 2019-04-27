import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';
import * as panelsActions from 'actions/panels';

class GetSimilarOfSelected extends React.Component{

  componentDidMount(){
    let trackName = this.props.match.params.track;
    let trackArtist = this.props.match.params.artist;

    this.props.lastfmActions.requestSimilarTrackIfNoData(
      trackName,
      trackArtist,
    );

    this.props.panelsActions.setCurrentPath({
      artist: trackArtist,
      name: trackName,
    });
  }

  render(){
    return null;
  }
}
export default connect(
  () => ({
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
    panelsActions: bindActionCreators(panelsActions, dispatch),
  }),

)(GetSimilarOfSelected);