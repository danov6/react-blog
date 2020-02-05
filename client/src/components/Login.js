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

  handleSubmit = () => {
    // const { onSubmit } = this.props;
    // const { title, body, author } = this.state;

    // if(title === '' || body === '' || author === ''){
    //   this.setState({
    //     error: 'Required fields missing'
    //   });
    //   return;
    // }

    // //Add Blog
    // return axios.post('http://localhost:8000/api/articles', {
    //     title,
    //     body,
    //     author,
    // })
    // .then((res) => onSubmit(res.data))
    // .then(() => this.setState({
    //     title: '',
    //     body: '',
    //     author: '',
    //     error: ''
    // }));
  }

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        { error !== '' ?
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {error}
          </div>
         :
         <div></div>
        }
        <h1 style={{marginTop: '20%', marginBottom: '10%', textAlign: 'center'}}>Login</h1>
        <input
          onChange={(ev) => this.handleChangeField('username', ev)}
          value={username}
          className="form-control my-3"
          placeholder="Username"
        />
        <input
          onChange={(ev) => this.handleChangeField('password', ev)}
          className="form-control my-3"
          placeholder="Password"
          value={password}>
        </input>
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