import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

class ForgotPassword extends React.Component {
  
  state = {
      email: '',
      error: ''
  };

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleSubmit = () => {
      //handle submit
  }

  render() {
    const { email, error } = this.state;

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
        <h1 style={{textAlign: 'center'}}>Password Reset</h1>
        <div className="form-group">
          <label for="inputEmail">Enter the email address that you used to register. We'll send you an email with your username and a link to reset your password.</label>
          <input
            onChange={(ev) => this.handleChangeField('email', ev)}
            name="email"
            value={email}
            className="form-control mb-2"
            id="inputEmail"
            placeholder="Email"
          />
        </div>
        <button onClick={this.handleSubmit} className="btn btn-primary my-2" style={{width: '100%'}}>Login</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onCancel: () => dispatch({ type: 'CANCEL_EDIT' }),
});

export default connect(null, mapDispatchToProps)(ForgotPassword);