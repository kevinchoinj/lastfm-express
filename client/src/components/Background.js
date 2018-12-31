import React from 'react';
import {connect} from 'react-redux';

import {selectCurrentTrackImageQuality} from 'reducers';

class Background extends React.Component{
  render(){
    const {
      artistImage,
    } = this.props;

    return(
      <div className="background__wrapper">
        <div className="background__container">
          <img src={artistImage} className="background__object" alt="background overlay" />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    artistImage: selectCurrentTrackImageQuality(state),
  }),
)(Background);
