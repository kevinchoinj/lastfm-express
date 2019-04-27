import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import GetCurrentTrack from 'components/services/GetCurrentTrack';
import PublicRoutes from 'routes/PublicRoutes';

import 'styles/main.css';
import 'styles/grid.css';
import 'styles/page.css';
import 'styles/navbar.css';
import 'styles/form.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="page_wrapper">
          <GetCurrentTrack/>
          <Switch>
            <Route path="/" component={PublicRoutes}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;