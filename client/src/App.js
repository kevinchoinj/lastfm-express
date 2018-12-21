import React, { Component } from 'react';
import TestButton from 'components/TestButton';
import SimilarOfCurrent from 'components/SimilarOfCurrent';
import SimilarOfSelected from 'components/SimilarOfSelected';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TestButton/>
        <SimilarOfCurrent/>
        <SimilarOfSelected/>
      </div>
    );
  }
}

export default App;