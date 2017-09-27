import React, { Component } from 'react';

import {Route} from 'react-router-dom';
import Root from './root';
import PostDetail from './postDetail';
import Category from './category';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={()=>(
            <Root/>
        )}/>
        <Route exact path="/:category/:id" component={({match})=>(
            <PostDetail match={match}/>
        )}/>
        <Route exact path="/:category" component={({match}) => (
            <Category match={match}/>
        )}/>
      </div>
    );
  }
}

export default App;
