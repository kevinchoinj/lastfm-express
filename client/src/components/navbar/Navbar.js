import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as panelsActions from 'actions/panels';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';
import FontAwesome from 'react-fontawesome';

class Navbar extends React.Component{


  render(){

    let {
      loadedContent,
    } = this.props;

	  return(
      <div className="navbar_wrapper">

        {loadedContent[siteRoutes.home]?
          <div className="navbar_option">
            <FontAwesome name="home"/>
          </div>
          :
          <Link to={siteRoutes.home}>
            <div className="navbar_option">
              <FontAwesome name="home"/>
            </div>
          </Link>
        }

        <br/>
        {loadedContent[siteRoutes.currentSimilar]?
          <div className="navbar_option">
            <FontAwesome name="music"/>
          </div>
          :
          <Link to={siteRoutes.currentSimilar}>
            <div className="navbar_option">
              <FontAwesome name="music"/>
            </div>
          </Link>
        }
      </div>
	  );
  }
}

export default connect(
  (state, ownProps) => ({
    loadedContent: state.transition.loadedContent,
    currentSimilar: state.panels.currentSimilar,
  }),
  dispatch => ({
    panelsActions: bindActionCreators(panelsActions, dispatch),
  }),
)(Navbar);

