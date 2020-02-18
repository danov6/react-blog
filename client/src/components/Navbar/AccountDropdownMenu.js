import React from 'react';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class AccountDropdownMenu extends React.Component {

    state ={
        anchorEl: null
    };

    handleLogout = () => {
        const { removeLoggedInUser } = this.props;
        localStorage.removeItem('JWT-Token');
        removeLoggedInUser();
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    
    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    render(){
        const { anchorEl } = this.state;
        return(
            <div className="nav-item dropdown" id="login_button" style={{marginRight: 26}}>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    <Avatar src={process.env.PUBLIC_URL + '/media/blank-profile-img.png'} style={{width: 30, height: 30}} alt="Profile Image" />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    style={{top: 52}}
                >
                    <MenuItem onClick={this.handleClose}><Link to="/account/profile" className="dropdown-item">Profile</Link></MenuItem>
                    <MenuItem onClick={this.handleClose}><Link to="/" className="dropdown-item" onClick={this.handleLogout}>Logout</Link></MenuItem>
                </Menu>
            </div>
            // <div className="nav-item dropdown" id="login_button" style={{marginRight: 26}}>
            //     <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //         <Avatar src={process.env.PUBLIC_URL + '/media/blank-profile-img.png'} style={{width: 30, height: 30}} alt="Profile Image" />
            //     </a>
            //     <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            //         <Link to="/account/profile" className="dropdown-item">Profile</Link>
            //         <Link to="/" className="dropdown-item" onClick={this.handleLogout}>Logout</Link>
            //     </div>
            // </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    removeLoggedInUser: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(null, mapDispatchToProps)(AccountDropdownMenu);