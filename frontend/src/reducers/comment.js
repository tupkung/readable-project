import {
    RECEIVE_POST_COMMENTS,
    UPDATE_COMMENT_VOTE,
    REMOVE_COMMENT,
    CREATE_COMMENT,
    UPDATE_COMMENT
} from '../actions/types';

export default function comment (state={comments:[]}, action) {
    switch(action.type){
        case RECEIVE_POST_COMMENTS:
            const comments = action.comments;
            return {
                ...state,
                comments
            };
        case UPDATE_COMMENT_VOTE:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if(comment.id !== action.comment.id){
                        return comment;
                    }
                    return Object.assign({}, comment, action.comment);
                })
            };
        case UPDATE_COMMENT :
            return {
                ...state,
                comments: state.comments.map(c => {
                    const {updateComment} = action;
                    if(c.id !== updateComment.id){
                        return c;
                    }else{
                        return updateComment;
                    }
                })
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(c => c.id !== action.comment.id && action.comment.deleted)
            };
        case CREATE_COMMENT:
            const {newComment} = action;
            return {
                ...state,
                comments: [newComment].concat(state.comments)
            };
        default:
            return state;
    }
}