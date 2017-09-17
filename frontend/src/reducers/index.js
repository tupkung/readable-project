import {
    RECEIVE_CATEGORIES,
    RECEIVE_POSTS
} from '../actions';

import {combineReducers} from 'redux';

function category (state={categories:[]}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES :
            const {categories} = action;
            return {
                ...state,
                categories
            };
        default :
            return state;
    }
}

function post (state={posts:[]}, action) {
    switch (action.type) {
        case RECEIVE_POSTS :
            const {posts} = action;
            return {
                ...state,
                posts
            };
        default :
            return state;
    }
}

export default combineReducers({
    category,
    post
})