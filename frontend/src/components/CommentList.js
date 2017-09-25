import React, {Component} from 'react';
import moment from 'moment';
import {FaCommentO}  from 'react-icons/lib/fa';

export default class CommentList extends Component {
    render() {
        const {comments} = this.props;

        return (
            <div>
                {
                    comments ?
                        comments.map(comment => (
                            <div className="box" key={comment.id}>
                                <article className="media">
                                    <div className="media-left">
                                        <figure className="icon is-48x48" style={{color:"#00D1B2"}}>
                                            <FaCommentO size={48}/>
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <div className="content">
                                            <div>
                                                {comment.body}
                                            </div>
                                            <p>
                                            <small>submitted {moment(new Date(comment.timestamp)).startOf('hour').fromNow()}  by {comment.author}</small>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))
                        : ""
                }
            </div>
        );
    }
}