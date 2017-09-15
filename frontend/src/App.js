import React, { Component } from 'react';

import {Route} from 'react-router-dom';
import Root from './root'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={()=>(
            <Root/>
        )}/>
      </div>
    );
  }
}

export default App;
