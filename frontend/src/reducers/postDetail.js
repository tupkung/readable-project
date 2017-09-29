import {
    REMOVE_POST,
    CREATE_POST,
    UPDATE_POST,
    UPDATE_POST_VOTE,
    RECEIVE_POST_COMMENTS,
    RECEIVE_POST_DETAIL
} from '../actions/types';
import {combineReducers} from 'redux';


export default function postDetail (state={}, action) {
    const {post} = action;
    switch(action.type){
        case RECEIVE_POST_DETAIL:
            return {
                ...state,
                post
            };
        case UPDATE_POST_VOTE:
            return {
                ...state,
                post
            };
        case REMOVE_POST:
            return {
                ...state,
                post: null
            };
        case UPDATE_POST:
            const {updatePost} = action;
            return {
                ...state,
                post: updatePost
            };
        default:
            return state;
    }
}