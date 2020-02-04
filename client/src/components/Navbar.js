import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Navbar extends React.Component {

    toggleSearch = () => {
        let search_form = document.getElementById('search_form');
        if(search_form.className.indexOf('show') != -1){
            search_form.className = "hide";
        }else{
            search_form.className = "show";
            search_form.querySelector('input').focus();
        }
    }

    render(){
        return(
            <Router>
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
                        <Link to="/create">
                            <button className="btn btn-success my-2 my-sm-0" type="button" id="create_button">Create!</button>
                        </Link>
                    </div>
                </nav>
            </Router>
        )
    }
}

export default Navbar;