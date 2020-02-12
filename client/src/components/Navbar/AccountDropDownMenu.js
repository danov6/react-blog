import React from 'react';

class AccountDropdownMenu extends React.Component {
    render(){
        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown link
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">Settings</a>
                    <a className="dropdown-item" href="#">Logout</a>
                </div>
            </li>
        );
    }
}

export default withRouter(AccountDropdownMenu);