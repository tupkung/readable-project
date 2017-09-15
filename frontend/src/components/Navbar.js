import React from 'react';
import logo from '../logo.svg';

export default class Navbar extends React.Component {
    render(){
        return(
            <nav className="navbar is-dark">
                    <div className="navbar-brand">
                        <div className="navbar-item" >
                            <img src={logo} width="60" height="60" alt="" />
                        </div>
                    </div>
                    <div className="navbar-start">
                        <a className="navbar-item">
                            About Me
                        </a>
                    </div>
            </nav>
        );
    }
}