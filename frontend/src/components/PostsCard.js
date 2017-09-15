import React, {Component} from 'react';
import {FaInfoCircle} from 'react-icons/lib/fa';


export default class PostsCard extends Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="icon is-48x48" style={{color:"#00D1B2"}}>
                                    <FaInfoCircle size={48}/>
                                </figure>
                            </div>
                            <div className="media-content">
                                <div className="columns">
                                    <div className="column is-11">
                                    <div className="content">
                                        <p>
                                            <strong>Udacity is the best place to learn React</strong>
                                            <br/>
                                            <small>by thingtwo </small> <span className="tag is-info is-rounded">React</span>
                                            <br/>
                                            <small>{(new Date(1467166872634)).toString()}</small>
                                        </p>
                                    </div>
                                    </div>
                                    <div className="column">
                                        <nav className="level">
                                            <div className="level-left">
                                                <div className="level-item has-text-centered">
                                                    <div>
                                                        <p className="heading">Votes</p>
                                                        <p className="title">6</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="icon is-48x48" style={{color:"#00D1B2"}}>
                                    <FaInfoCircle size={48}/>
                                </figure>
                            </div>
                            <div className="media-content">
                                <div className="columns">
                                    <div className="column is-11">
                                    <div className="content">
                                        <p>
                                            <strong>Learn Redux in 10 minutes!</strong>
                                            <br/>
                                            <small>by thingone </small><span className="tag is-info is-rounded">Redux</span>
                                            <br/>
                                            <small>{(new Date(1468479767190)).toString()}</small>
                                        </p>
                                    </div>
                                    </div>
                                    <div className="column">
                                        <nav className="level">
                                            <div className="level-left">
                                                <div className="level-item has-text-centered">
                                                    <div>
                                                        <p className="heading">Votes</p>
                                                        <p className="title">-5</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}