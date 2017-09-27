import React from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import {FaHome} from 'react-icons/lib/fa';

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
                        <Link to="/" className="navbar-item">
                            <FaHome size={22}/>&nbsp;&nbsp;Home
                        </Link>
                    </div>
            </nav>
        );
    }
}