import {
    RECEIVE_POSTS,
    REMOVE_POST,
    CREATE_POST,
    UPDATE_POST,
    UPDATE_POST_VOTE,
    UPDATE_ORDER_TIME_STAMP,
    UPDATE_ORDER_VOTE_SCORE,
    UPDATE_CATEGORY_FILTER
} from '../actions/types';

export default function post (state={posts:[], orderTimeStamp: '', orderVoteScore: 'desc', category: ''}, action) {
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