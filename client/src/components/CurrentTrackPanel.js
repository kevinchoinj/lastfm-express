import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from 'actions/lastfm';
import placeholder from 'media/lastfm.png';
import UsernameForm from 'components/forms/UsernameForm';

import {
  selectCurrentTrackName,
  selectCurrentTrackArtistText,
  selectCurrentTrackImageQuality,
} from 'reducers';

const CurrentImage = ({image}) => {
  if (image.length>1){
    return (
      <img src={image} className="current_image" alt="name"/>
    );
  }
  else {
    return (
      <img src={placeholder} className="current_image" alt="name"/>
    );
  }
};

class CurrentTrackPanel extends React.Component{

  updateUsername = values => {
    this.props.lastfmActions.updateUsernameThenUpdate(values);
  }

  render(){
    const {
      artist,
      name,
      image,
    } = this.props;

    return(
      <div className="current_wrapper">
        <div className="current_container">
          {artist ?
            <div className="current_inner">
              <CurrentImage
                image={image}
                name={name}
              />
              <div className="current_overlay">
                <strong>{artist}</strong>
                <br/>
                {name}
              </div>
            </div>
            :
            <div>
              Loading...
            </div>
          }
        </div>
        <div className="current_username__container">
          <UsernameForm onSubmit={this.updateUsername}/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    name: selectCurrentTrackName(state),
    artist: selectCurrentTrackArtistText(state),
    image: selectCurrentTrackImageQuality(state),
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(CurrentTrackPanel);

