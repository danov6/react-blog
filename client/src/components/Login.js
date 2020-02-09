import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class Login extends React.Component {
  
  state = {
      username: '',
      password: '',
      error: ''
  };

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="app_container col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
        { error !== '' ?
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {error}
          </div>
         :
         <div></div>
        }
        <h1 style={{textAlign: 'center'}}>Login</h1>
        <div className="form-group">
          <label for="inputUsername">Username</label>
          <input
            onChange={(ev) => this.handleChangeField('username', ev)}
            value={username}
            className="form-control my-3"
            id="inputUsername"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label for="inputPassword">Password</label>
          <input
            onChange={(ev) => this.handleChangeField('password', ev)}
            type="password"
            className="form-control my-3"
            placeholder="Password"
            id="inputPassword"
            value={password}>
          </input>
        </div>
        <div className="form-check mb-2 mr-sm-2">
          <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
          <label className="form-check-label" for="inlineFormCheck">
            Remember me
          </label>
        </div>
        <Link to="/"><button onClick={this.handleSubmit} className="btn btn-primary float-right">Login</button></Link>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onCancel: () => dispatch({ type: 'CANCEL_EDIT' }),
});

export default connect(null, mapDispatchToProps)(Login);