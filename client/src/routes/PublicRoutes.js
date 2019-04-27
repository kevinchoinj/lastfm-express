import React from 'react';
import { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';
import * as transitionActions from 'actions/transition';

/* Pages */
import CurrentTrackPanel from 'components/CurrentTrackPanel';
import SimilarOfCurrentPanel from 'components/SimilarOfCurrentPanel';
import ArtistOfCurrentPanel from 'components/ArtistOfCurrentPanel';
import SimilarOfSelectedPanel from 'components/SimilarOfSelectedPanel';
import NotFound from 'pages/NotFound';

/* Services */
import GetSimilarOfSelected from 'components/services/GetSimilarOfSelected';

/* Components */
import Navbar from 'components/navbar/Navbar';
import Background from 'components/Background';

class SiteRoutes extends Component {

  componentDidMount(){
    let currentName = this.props.location.pathname;
    this.props.transitionActions.loadContent(currentName, true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.transitionActions.startTransition('start');
      let currentName = this.props.location.pathname;
      let nextName = nextProps.location.pathname;
      this.props.transitionActions.previousPageName(currentName);

      setTimeout(function(){
        this.props.transitionActions.startTransition('end');
        if (this.props.loadedContent[currentName]){
          this.props.transitionActions.loadContent(currentName, false);
        }
        this.props.transitionActions.loadContent(nextName, true);
      }.bind(this), 400);
      setTimeout(function(){
        this.props.transitionActions.startTransition('reset');
      }.bind(this), 800);
    }
  }

  render() {

    const {
      loadedContent,
      currentPage,
    } =this.props;

    return (
      <div>
        <CurrentTrackPanel/>

        <Background/>

        {loadedContent[siteRoutes.home] &&
          <ArtistOfCurrentPanel />}
        {loadedContent[siteRoutes.currentSimilar] &&
          <SimilarOfCurrentPanel />}

        {currentPage && currentPage.substring(0, siteRoutes.similar.length) === siteRoutes.similar &&
          <SimilarOfSelectedPanel/>}

        <Switch>
          <Route exact path={siteRoutes.home}
            render={null}/>
          <Route exact path={siteRoutes.currentSimilar}
            render={null}/>
          <Route exact path={siteRoutes.similar+'/:artist/:track'}
            render={(props) =>(
              <GetSimilarOfSelected {...props} key={props.match.params.artist + props.match.params.track}/>
            )}/>
          <Route component={NotFound} />
        </Switch>
        <Navbar/>

      </div>
    );
  }
}

export default connect(
  (state) => {
    const loadedContent = state.transition.loadedContent;

    let currentPage;
    currentPage = Object.keys(loadedContent).find(key => loadedContent[key] === true);

    return {
      currentPage,
      loadedContent,
    };
  },
  dispatch => ({
    transitionActions: bindActionCreators(transitionActions, dispatch),
  }),
)(SiteRoutes);
