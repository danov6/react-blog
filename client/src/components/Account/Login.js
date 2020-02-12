import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import {
  Link
} from "react-router-dom";

import LoadingSpinner from '../LoadingSpinner';

class Login extends React.Component {
  
  state = {
      username: '',
      password: '',
      isLoading: false,
      error: ''
  };

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleLogin = () => {
    const { username, password } = this.state;
    const { setLoggedInUser } = this.props;

    this.setState({
      isLoading: true
    });

    if(username === '' || password === ''){
      this.setState({
        isLoading: false,
        error: 'Missing username/password. Try again.'
      });
    }else{
      axios.post('http://localhost:8000/api/users/login', {
          username,
          password,
      })
      .then((res) => {
        let data = res.data;
        console.log(data)
        if(data.error){
          this.setState({
            isLoading: false,
            error: data.error[0]
          });
        }else{
          this.setState({
            isLoading: false
          });
          localStorage.setItem('JWT-Token', data.token);
          setLoggedInUser(data);
        }
      });
    }
  }

  render() {
    const { username, password, error, isLoading } = this.state;

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
          <label htmlFor="inputUsername">Username/Email</label>
          <input
            onChange={(ev) => this.handleChangeField('username', ev)}
            name="username"
            value={username}
            className="form-control mb-2"
            id="inputUsername"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            onChange={(ev) => this.handleChangeField('password', ev)}
            name="password"
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            id="inputPassword"
            value={password}>
          </input>
        </div>
        <div className="form-check mb-2 mr-sm-2">
          <input className="form-check-input" type="checkbox" id="inlineFormCheck" name="rememberme" />
          <label className="form-check-label" htmlFor="inlineFormCheck">
            Remember me
          </label>
          <Link to="/account/password-reset" className="float-right">Forgot Password?</Link>
        </div>
        {isLoading ? <LoadingSpinner /> : <button onClick={this.handleLogin} className="btn btn-primary my-2" style={{width: '100%'}}>Login</button> }
        <hr/>
        <div className="form-group">
          <h5 style={{textAlign: 'center', width: '100%'}} className="mb-3">Don't have an account?</h5>
          <Link to="/account/create-account"><button onClick={this.handleSubmit} className="btn btn-outline-primary" style={{width: '100%'}}>Signup Today</button></Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setLoggedInUser: user => dispatch({ type: 'LOGIN', user }),
});

export default connect(null, mapDispatchToProps)(Login);