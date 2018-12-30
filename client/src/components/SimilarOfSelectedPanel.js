import React from 'react';
import {connect} from 'react-redux';
import Scrollbar from 'smooth-scrollbar';
import SimilarOfSelected from 'components/SimilarOfSelected';
import classNames from 'classnames';

class SimilarOfSelectedPanel extends React.Component{
  componentDidMount() {
    Scrollbar.init(document.querySelector('#current_similar_panel'), {
      alwaysShowTracks: true,
      syncCallbacks: true,
    });
  }

  render(){

    let {
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
          <SimilarOfSelected/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    transitionStatus: state.transition.transitionStatus,
  }),
)(SimilarOfSelectedPanel);
