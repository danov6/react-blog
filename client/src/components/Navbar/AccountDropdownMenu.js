import React from 'react';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class AccountDropdownMenu extends React.Component {

    handleLogout = () => {
        const { removeLoggedInUser } = this.props;
        localStorage.removeItem('JWT-Token');
        removeLoggedInUser();
    }

    render(){
        return(
            <div className="nav-item dropdown" id="login_button" style={{marginRight: 26}}>
                <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={process.env.PUBLIC_URL + '/media/blank-profile-img.png'} style={{width: 25}} />
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to="/account/profile" className="dropdown-item">Profile</Link>
                    <Link to="/" className="dropdown-item" onClick={this.handleLogout}>Logout</Link>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    removeLoggedInUser: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(null, mapDispatchToProps)(AccountDropdownMenu);