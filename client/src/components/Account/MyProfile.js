import React from 'react';

import { connect } from 'react-redux';

const MyProfile = (props) => {
  const { user } = props;
  return (
    <div>
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
              <button onClick={() => this.handleDelete()} type="button" className="btn btn-danger">Delete Account</button>
          </div>
        </div>
      </div>
      <div className="app_container container">
        <div>
          <div className="col-12 col-lg-6 offset-lg-3">
            <i>Comments:</i>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps,null)(MyProfile);