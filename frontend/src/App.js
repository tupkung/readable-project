import React, { Component } from 'react';

import {Route} from 'react-router-dom';
import RootContainer from './RootContainer';
import PostDetailContainer from './PostDetailContainer';
import CategoryContainer from './CategoryContainer';
import NotFoundContainer from './NotFoundContainer';

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
        <Route exact path="/:category/:id" component={(match)=>(
            <PostDetailContainer match={match} />
        )}/>
        <Route exact path="/:category" component={({match}) => (
            <CategoryContainer match={match}/>
        )}/>
        <Route exact path="/error/page/404" component={NotFoundContainer}/>
      </div>
    );
  }
}

export default App;
