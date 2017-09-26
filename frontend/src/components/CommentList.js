import React, {Component} from 'react';
import CommentCard from '../components/CommentCard';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export default class CommentList extends Component {
    render() {
        const {comments} = this.props;

        return (
            <div>
                {
                    comments ?
                        comments.map(comment => (
                            <CommentCard comment={comment} />
                        ))
                        : ""
                }
            </div>
        );
    }
}