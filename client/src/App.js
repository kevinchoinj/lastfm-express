import React, { Component } from 'react';

import GetCurrentTrack from 'services/GetCurrentTrack';

import CurrentTrackPanel from 'components/CurrentTrackPanel';
import SimilarOfCurrentPanel from 'components/SimilarOfCurrentPanel';

import 'styles/main.css';
import 'styles/grid.css';
import 'styles/page.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="page_wrapper">
          <GetCurrentTrack/>
          <CurrentTrackPanel/>
          <SimilarOfCurrentPanel/>
        </div>
      </div>
    );
  }
}

export default App;