import React from 'react';

class NotFound extends React.Component{
  render(){
    return(
      <div className="notfound_wrapper">
        <div className="notfound_title">
          404
        </div>
        <div className="notfound_text">
          Sorry, that page does not exist.
        </div>
      </div>
    );
  }
}

export default NotFound;