import React, {Component} from 'react';
import {FaInfoCircle} from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';


export default class PostsCard extends Component {
    render() {
        const {data} = this.props;

        return (
            <div>
                {
                    data.map(post=>(
                        <div className="card" key={post.id}>
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
                                                    <strong>{post.title}</strong>
                                                    <br/>
                                                    <small>by {post.author} </small> <span className="tag is-info is-rounded">{capitalize(post.category)}</span>
                                                    <br/>
                                                    <small>{(new Date(post.timestamp)).toString()}</small>
                                                </p>
                                            </div>
                                            </div>
                                            <div className="column">
                                                <nav className="level">
                                                    <div className="level-left">
                                                        <div className="level-item has-text-centered">
                                                            <div>
                                                                <p className="heading">Votes</p>
                                                                <p className="title">{post.voteScore}</p>
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
                    ))
                }
            </div>
        );
    }
}