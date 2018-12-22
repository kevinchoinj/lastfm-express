import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CurrentTrackPanel from 'components/CurrentTrackPanel';
import SimilarOfCurrentPanel from 'components/SimilarOfCurrentPanel';
import ArtistOfCurrentPanel from 'components/ArtistOfCurrentPanel';

import Navbar from 'components/navbar/Navbar';

import {siteRoutes} from 'data/siteRoutes';

import * as transitionActions from 'actions/transition';

class SiteRoutes extends Component {

  componentDidMount(){
    let currentName = this.props.location.pathname;
    this.props.transitionActions.loadContent(currentName, true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.transitionActions.startTransition("start");
      let currentName = this.props.location.pathname;
      let nextName = nextProps.location.pathname;
      this.props.transitionActions.previousPageName(currentName);

      setTimeout(function(){
        this.props.transitionActions.startTransition("end");
        this.props.transitionActions.loadContent(currentName, false);
        this.props.transitionActions.loadContent(nextName, true);
      }.bind(this), 400);
      setTimeout(function(){
        this.props.transitionActions.startTransition("reset");
        this.props.transitionActions.loadContent(currentName, false);
        this.props.transitionActions.loadContent(nextName, true);
      }.bind(this), 800);
    } else if (this.props.location === nextProps.location) {
    }
  }

  render() {

    const {
      loadedContent,
    } =this.props;

    return (
      <div>

        <CurrentTrackPanel/>

        {loadedContent[siteRoutes.home]?
        <ArtistOfCurrentPanel />:null}
        {loadedContent[siteRoutes.currentSimilar]?
        <SimilarOfCurrentPanel />:null}

        <Navbar/>

      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    loadedContent: state.transition.loadedContent,
    transitionStatus: state.transition.transitionStatus,
  }),
  dispatch => ({
    transitionActions: bindActionCreators(transitionActions, dispatch),
  }),
)(SiteRoutes);