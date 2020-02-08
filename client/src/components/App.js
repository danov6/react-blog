import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Edit from './Edit';
import Create from './Create';
import Login from './Login';

import Navbar from './Navbar';

class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/edit" component={Edit} /> */}
          <Route exact path="/create" component={Create} />
          <Route exact path="/login" component={Login} />
          <Route path="/edit/:articleId" component={Edit} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);