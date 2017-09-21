import {
    RECEIVE_CATEGORIES,
    RECEIVE_POSTS,
    REMOVE_POST,
    CREATE_POST,
    UPDATE_POST_VOTE
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
        case REMOVE_POST :
            const {post} = action;
            const newPosts = state.posts.filter(p => p.id !== post.id && post.deleted)
            return {
                ...state,
                posts: newPosts
            };
        case CREATE_POST :
            const {newPost} = action;
            const updatedPosts = state.posts.concat([newPost]);
            return {
                ...state,
                posts: updatedPosts
            };
        case UPDATE_POST_VOTE :
            const updatePostsVote = state.posts.map(p => {
                if(p.id !== action.post.id){
                    return p;
                }
                return Object.assign({}, p, action.post);
            });
            return {
                ...state,
                posts: updatePostsVote
            };
        default :
            return state;
    }
}

export default combineReducers({
    category,
    post
})