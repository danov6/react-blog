import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './Home';
import EditArticle from './Article/EditArticle';
import ViewArticle from './Article/ViewArticle';
import CreateArticle from './Article/CreateArticle';

import Login from './Account/Login';
import ForgotPassword from './Account/ForgotPassword';
import CreateAccount from './Account/CreateAccount';

import Navbar from './Navbar/Navbar';

class App extends React.Component {

  // componentDidMount(){
  //   // Set axios JWT
  //   let token = localStorage.getItem("JWT-Token");
  //   if (token) {
  //       // Set axios defaults to include JWT in requests
  //       axios.defaults.headers.common = {'Authorization': 'Bearer ' + token};
  //       axios.get("/api/users").then((response) => {
  //           if (response.data && response.data.error) {
  //               // Display error message
  //               alert(response.data.error);
  //               return;
  //           }
  //           const userData = response.data;
  //           store.dispatch({
  //               type: 'LOGIN',
  //               user: userData
  //           });
  //       }).catch(error => {
  //           console.log(error)
  //       });
  //   } else {
  //       console.log("[ App ] Error: No token found!");
  //       this.props.history.replace('/login');
  //   }
  // }
  render(){
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/account/login" component={Login} />
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