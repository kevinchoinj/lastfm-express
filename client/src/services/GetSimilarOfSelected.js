import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';
import * as panelsActions from 'actions/panels';
import {siteRoutes} from 'data/siteRoutes';

class GetSimilarOfSelected extends React.Component{
  componentDidMount(){
    let trackName = this.props.match.params.track;
    let trackArtist = this.props.match.params.artist;
    this.props.lastfmActions.requestSimilarTracks(trackName, trackArtist);

    this.props.panelsActions.setCurrentPath(siteRoutes.similar + '/' + trackArtist + '/' + trackName);
  }

  render(){
    return null;
  }
}
export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
    panelsActions: bindActionCreators(panelsActions, dispatch),
  }),

)(GetSimilarOfSelected);