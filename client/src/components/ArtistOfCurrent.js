import React from 'react';
import {connect} from 'react-redux';

class ArtistOfCurrent extends React.Component{
  render(){
    return(
      <div className="grid_container">
        artist details
      </div>
	  );
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
  }),
)(ArtistOfCurrent);
