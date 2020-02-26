import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import AccountDropdownMenu from './AccountDropdownMenu';
import NotificationsDropdownMenu from './NotificationsDropdownMenu';

import { Link } from "react-router-dom";

class Navbar extends React.Component {

    state = {
        isLoggedIn: false
    };
    componentDidMount(){
        const { setLoggedInUser, setLoggedOutUser } = this.props;
        let token = localStorage.getItem("JWT-Token");
        if (token) {
            axios.defaults.headers.common = {'Authorization': 'Bearer ' + token};
            axios.get("http://localhost:8000/api/users/profile").then((response) => {
                //An error took place, delete token and logout the user
                if (response.data && response.data.error) {
                    setLoggedOutUser();
                    localStorage.removeItem("JWT-Token");
                    return;
                }

                //set user to redux store
                const userData = response.data;
                setLoggedInUser(userData);
                this.setState({
                    isLoggedIn: true
                });
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log("[ App ] Error: No token found!");
            setLoggedOutUser();
        }
    }

    toggleSearch = () => {
        let search_form = document.getElementById('search_form');
        if(search_form.className.indexOf('search_show') !== -1){
            search_form.className = "search_hide";
        }else{
            search_form.className = "search_show";
            search_form.querySelector('input').focus();
        }
    }

    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-light bg-dark" id="navbar">
                <Link to="/" className="navbar-brand">Blog of Interests</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" aria-hidden="true"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <button id="search_button" onClick={this.toggleSearch} style={{marginRight: '1%'}}>
                        <svg className="bi bi-search" width="1.5em" height="1.5em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{color: '#fff'}}>
                            <path fillRule="evenodd" d="M12.442 12.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"></path>
                            <path fillRule="evenodd" d="M8.5 14a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM15 8.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <form className="form-inline my-2 my-lg-0" id="search_form" className="hide"><input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" autoFocus /></form>
                    {Object.keys(this.props.user).length === 0 ? 
                        ""
                    : 
                        <NotificationsDropdownMenu />
                    }
                    {Object.keys(this.props.user).length === 0 ? 
                        <Link to="/account/login">
                            <button className="btn btn-success my-2 my-sm-0" type="button" id="create_button">Login</button>
                        </Link>
                    : 
                        <Link to="/article/create">
                            <button className="btn btn-success my-2 my-sm-0" type="button" id="create_button">Create!</button>
                        </Link>
                    }
                    {Object.keys(this.props.user).length === 0 ?
                        <span></span>
                    :
                        <AccountDropdownMenu />
                    }
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    setLoggedInUser: user => dispatch({ type: 'LOGIN', user }),
    setLoggedOutUser: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);