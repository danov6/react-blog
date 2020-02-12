import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import EditArticle from './Article/EditArticle';
import ViewArticle from './Article/ViewArticle';
import CreateArticle from './Article/CreateArticle';

import Login from './Account/Login';
import ForgotPassword from './Account/ForgotPassword';
import CreateAccount from './Account/CreateAccount';
import MyProfile from './Account/MyProfile';

import Navbar from './Navbar/Navbar';

class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/account/login" component={Login} />
          <Route exact path="/account/profile" component={MyProfile} />
          <Route exact path="/account/password-reset" component={ForgotPassword} />
          <Route exact path="/account/create-account" component={CreateAccount} />
          <Route exact path="/article/create" component={CreateArticle} />
          <Route exact path="/article/edit/:articleId" component={EditArticle} />
          <Route exact path="/article/view/:articleId" component={ViewArticle} />
          {/* <Route component={404} /> */}
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);