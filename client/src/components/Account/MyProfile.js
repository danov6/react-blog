import React from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

class MyProfile extends React.Component {

  handleDelete = (id) => {
    return axios.delete(`http://localhost:8000/api/articles/${id}`)
      .then(() => {
        console.log('Article deleted..');
        window.location.pathname = "/";
      });
  }

  render() {
    const { user } = this.props;
    return (
      <div className="app_container container">
        <div>
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">My Account</h1>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-12">
            <p>Welcome {user.full_name}!</p>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-12">
              <button onClick={() => this.handleDelete(user._id)} type="button" className="btn btn-danger">Delete Account</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps,null)(MyProfile);