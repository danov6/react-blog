import axios from 'axios';
import React from 'react';
import {
  Link
} from "react-router-dom";

import LoadingSpinner from '../LoadingSpinner';

class CreateAccount extends React.Component {
  
  state = {
      full_name: '',
      email: '',
      username: '',
      password: '',
      confirm_password: '',
      is_loading: false,
      error: ''
  };

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleCreateAccount = () => {
    const { full_name, email, username, password, confirm_password } = this.state;

    this.setState({
      isLoading: true
    });

    if(full_name === '' || email === '' || username === '' || password === '' || confirm_password === ''){
        this.setState({
            isLoading: false,
            error: 'Missing fields. Try again.'
        });
    }else if(password !== confirm_password){
        this.setState({
            isLoading: false,
            error: "Passwords don't match"
        });
    }else{
        axios.post('http://localhost:8000/users/signup', {
            full_name,
            email,
            username,
            password,
        })
        .then((res) => {
            let data = res.data;
            if(data.error){
                this.setState({
                    isLoading: false,
                    error: data.error[0]
                });
            }else{
                this.setState({
                    isLoading: false
                });
                console.log('CREATED')
                //setSessionToken(data.token);
                //console.log('Token: ' + data.token);
            }
        });
    }
  }

  render() {
    const { full_name, username, email, password, confirm_password, error, is_loading } = this.state;

    return (
      <div className="app_container col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" style={{padding: '4%'}}>
        { error !== '' ?
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {error}
          </div>
         :
         <div></div>
        }
        <h1 style={{textAlign: 'center'}}>Create New Account</h1>
        <div className="form-group">
          <label htmlFor="inputFullName">Full Name</label>
          <input
            onChange={(ev) => this.handleChangeField('full_name', ev)}
            name="fullName"
            className="form-control mb-2"
            id="inputFullName"
            placeholder="Full Name"
            value={full_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputUsername">Username</label>
          <input
            onChange={(ev) => this.handleChangeField('username', ev)}
            name="username"
            className="form-control mb-2"
            id="inputUsername"
            placeholder="Username"
            value={username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            onChange={(ev) => this.handleChangeField('email', ev)}
            name="email"
            className="form-control mb-2"
            id="inputEmail"
            placeholder="Email"
            value={email}
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
        <div className="form-group">
          <label htmlFor="inputConfirmPassword">Confirm Password</label>
          <input
            onChange={(ev) => this.handleChangeField('confirm_password', ev)}
            name="confirmpassword"
            type="password"
            className="form-control mb-2"
            placeholder="Confirm Password"
            id="inputConfirmPassword"
            value={confirm_password}>
          </input>
        </div>
        {is_loading ? <LoadingSpinner /> : <button onClick={this.handleCreateAccount} className="btn btn-primary" style={{width: '100%'}}>Create Account</button> }
        <Link to="/account/login"><button onClick={this.handleSubmit} className="btn my-2" style={{width: '100%'}}>Login With Existing Account</button></Link>
      </div>
    )
  }
}

export default CreateAccount;