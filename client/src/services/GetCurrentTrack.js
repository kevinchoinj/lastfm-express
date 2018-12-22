import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';

class GetCurrentTrack extends React.Component{
  componentDidMount(){
    this.props.lastfmActions.requestCurrentTrackThenArtistSimilar();

    setInterval(function() {
      this.props.lastfmActions.requestCurrentTrackThenArtistSimilar();
    }.bind(this), 4000);

  }
  render(){
    return null;
  }
}
export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch)}),
)(GetCurrentTrack);