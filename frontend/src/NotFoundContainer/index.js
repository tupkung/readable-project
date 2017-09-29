import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FaHome} from 'react-icons/lib/fa';
import './NotFound.css';


export default class NotFoundContainer extends Component {
    render() {
        return (
            <div className="container is-fluid">
                <section className="hero is-medium is-danger is-bold not-found-content">
                    <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            404 Not found
                        </h1>
                        <h2 className="subtitle">
                            The page you are looking for can't be found...
                            <br/>
                            <br/>
                            <Link to={"/"}>
                                <FaHome size={22}/> Go back to main page
                            </Link>
                        </h2>
                    </div>
                    </div>
                </section>
            </div>
        );
    }
}