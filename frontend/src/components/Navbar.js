import React from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {
    render(){
        return(
            <nav className="navbar is-dark">
                    <div className="navbar-brand">
                        <div className="navbar-item" >
                            <Link to="/"><img src={logo} width="60" height="60" alt="" /></Link>
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