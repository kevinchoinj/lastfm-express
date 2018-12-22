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


        {Object.entries(loadedContent).slice(2).map((value, key) => {
          if (loadedContent[value[0]]) {
            return (
              <div className="navbar_option" key={key}>
                <FontAwesome name="plus"/>
              </div>
            )
          }
          else {
            return (
              <div className="navbar_option__container" key={key}>
                <Link to={value[0]}>
                  <div className="navbar_option">
                    <FontAwesome name="plus"/>
                  </div>
                </Link>
                <div className="navbar_option__overlay" onClick={()=>console.log(value[0].split('/'))}>
                  <div>
                  <strong>{value[0].split('/')[2]}</strong>
                  </div>
                  <div>
                  {value[0].split('/')[3]}
                  </div>
                </div>
              </div>
            )
          }
        })}

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

