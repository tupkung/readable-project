import React, {Component} from 'react';
import CommentCard from '../components/CommentCard';

/**
 * @description: Represents comment card component list.
 */
export default class CommentList extends Component {
    render() {
        const {comments} = this.props;

        return (
            <div>
                {
                    comments ?
                        comments.map(comment => (
                            <CommentCard comment={comment} key={comment.id}/>
                        ))
                        : ""
                }
            </div>
        );
    }
}