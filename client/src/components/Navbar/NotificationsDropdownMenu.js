import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

class NotificationsDropdownMenu extends React.Component {

    state ={
        anchorEl: null,
        notifications: 100
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
            notifications: 0
        });
    };
    
    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    render(){
        const { anchorEl, notifications } = this.state;
        return(
            <div className="nav-item dropdown" id="login_button" style={{marginRight: 26}}>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={{color: '#fff'}}>
                    <Badge badgeContent={notifications} max={99} {...defaultProps} />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    style={{top: 45}}
                >
                    <MenuItem>Test</MenuItem>
                    <MenuItem>Test</MenuItem>
                </Menu>
            </div>
        );
    }
}

const defaultProps = {
    color: 'secondary',
    children: <NotificationsIcon />,
};

const mapDispatchToProps = dispatch => ({
    removeLoggedInUser: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(null, mapDispatchToProps)(NotificationsDropdownMenu);