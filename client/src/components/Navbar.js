import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    withRouter
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
                    <Link to="/login" style={{marginRight: 26}}>
                        <button id="login_button">
                            <svg className="bi bi-person" width="1.5em" height="1.5em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M15 16s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002zM5.022 15h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C13.516 12.68 12.289 12 10 12c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002zM10 9a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </Link>
                    <Link to="/create">
                        <button className="btn btn-success my-2 my-sm-0" type="button" id="create_button">Create!</button>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);