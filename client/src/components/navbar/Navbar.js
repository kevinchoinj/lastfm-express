import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as panelsActions from 'actions/panels';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';

class Navbar extends React.Component{


  render(){

	  return(
      <div className="navbar_wrapper">
        <Link to={siteRoutes.home}>
          Home
        </Link>
        <br/>
        <Link to={siteRoutes.currentSimilar}>
          Sim
        </Link>
      </div>
	  );
  }
}

export default connect(
  (state, ownProps) => ({
    currentSimilar: state.panels.currentSimilar,
  }),
  dispatch => ({
    panelsActions: bindActionCreators(panelsActions, dispatch),
  }),
)(Navbar);

