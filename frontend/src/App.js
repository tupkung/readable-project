import React, { Component } from 'react';

import {Route} from 'react-router-dom';
import RootContainer from './RootContainer';
import PostDetailContainer from './PostDetailContainer';
import CategoryContainer from './CategoryContainer';

/**
 * @description Represents a main application
 */
class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={()=>(
            <RootContainer/>
        )}/>
        <Route exact path="/:category/:id" component={({match})=>(
            <PostDetailContainer match={match}/>
        )}/>
        <Route exact path="/:category" component={({match}) => (
            <CategoryContainer match={match}/>
        )}/>
      </div>
    );
  }
}

export default App;
