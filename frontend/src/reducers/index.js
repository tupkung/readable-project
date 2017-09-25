import {
    RECEIVE_CATEGORIES,
    RECEIVE_POSTS,
    REMOVE_POST,
    CREATE_POST,
    UPDATE_POST,
    UPDATE_POST_VOTE,
    UPDATE_ORDER_TIME_STAMP,
    UPDATE_ORDER_VOTE_SCORE,
    UPDATE_CATEGORY_FILTER,
    RECEIVE_POST_COMMENTS,
    RECEIVE_POST_DETAIL
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

function post (state={posts:[], orderTimeStamp: '', orderVoteScore: 'desc', category: ''}, action) {
    switch (action.type) {
        case RECEIVE_POSTS :
            const {posts} = action;
            return {
                ...state,
                posts
            };
        case REMOVE_POST :
            const {post} = action;
            const newPosts = state.posts.filter(p => p.id !== post.id && post.deleted);
            return {
                ...state,
                posts: newPosts
            };
        case CREATE_POST :
            const {newPost} = action;
            const updatedPosts = [newPost].concat(state.posts);
            return {
                ...state,
                posts: updatedPosts
            };
        case UPDATE_POST :
            const {updatePost} = action;
            const updatePosts = state.posts.map(p => {
                if(p.id !== updatePost.id){
                    return p;
                }else{
                    return updatePost;
                }
            });
            return {
                ...state,
                posts: updatePosts
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
        case UPDATE_ORDER_TIME_STAMP :
            const orderTimeStamp = (state.orderTimeStamp === "") ? "asc" : (state.orderTimeStamp === "desc") ? "" : "desc";
            return {
                ...state,
                orderTimeStamp,
                orderVoteScore: ""
            };
        case UPDATE_ORDER_VOTE_SCORE :
            const orderVoteScore = (state.orderVoteScore === "") ? "asc" : (state.orderVoteScore === "desc") ? "" : "desc";
            return {
                ...state,
                orderVoteScore,
                orderTimeStamp: ""
            };
        case UPDATE_CATEGORY_FILTER :
            const {category} = action.post;
            return {
                ...state,
                category
            };
        default :
            return state;
    }
}

function postDetail (state={}, action) {
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

function comment (state={comments:[]}, action) {
    switch(action.type){
        case RECEIVE_POST_COMMENTS:
            const comments = action.comments;
            return {
                ...state,
                comments
            };
        default:
            return state;
    }
}

export default combineReducers({
    category,
    post,
    postDetail,
    comment
})