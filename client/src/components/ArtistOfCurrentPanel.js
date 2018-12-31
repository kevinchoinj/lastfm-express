import React from 'react';
import {connect} from 'react-redux';
import Scrollbar from 'smooth-scrollbar';
import ArtistOfCurrent from 'components/ArtistOfCurrent';
import classNames from 'classnames';

class ArtistOfCurrentPanel extends React.Component{
  componentDidMount() {
    Scrollbar.init(document.querySelector('#current_similar_panel'), {
      alwaysShowTracks: true,
      syncCallbacks: true,
    });
  }

  render(){

    const {
      transitionStatus,
    } = this.props;

    const panelName = classNames(
      'similar_current__container',
      {
        'similar_current__container--hidden':
          transitionStatus === 'start' ||
          transitionStatus === 'end',
      }
    );

    return(
      <div className={panelName}>
        <div className="similar_current__content" id="current_similar_panel">
          <ArtistOfCurrent/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    transitionStatus: state.transition.transitionStatus,
  }),
)(ArtistOfCurrentPanel);
