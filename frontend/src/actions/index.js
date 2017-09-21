import * as ReadableAPIUtil from '../utils/Api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';

export const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

export const removePost = (post) => ({
    type: REMOVE_POST,
    post
});

export const createPost = (newPost) => ({
    type: CREATE_POST,
    newPost
});

export const updatePostVote = (post) => ({
    type: UPDATE_POST_VOTE,
    post
});

export const fetchCategories = () => dispatch => (
    ReadableAPIUtil
        .fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
);

export const fetchPosts = (sortFactor=2, byTimeStamp=false) => dispatch => (
    ReadableAPIUtil
        .fetchPosts()
        .then(posts => {
            if(sortFactor > 0) {
                posts.sort((a,b) => {
                    const sortValue = (sortFactor === 1) ? 1 : -1;
                    if(byTimeStamp){
                        return sortValue * (a.timestamp - b.timestamp);
                    }
                    return sortValue * (a.voteScore - b.voteScore);
                });
            }
            
            dispatch(receivePosts(posts));
        })
);

export const deletePost = (id) => dispatch => (
    ReadableAPIUtil
        .deletePost(id)
        .then(post => dispatch(removePost(post)))
);

export const searchCategories = (query) => dispatch => (
    ReadableAPIUtil
        .fetchCategories()
        .then(categories => {
            const regEx = new RegExp(query, 'i');
            const searchCategories = categories.filter(category => regEx.test(category.name));
            dispatch(receiveCategories(searchCategories));
        })
);

export const searchPostsByCategory = (category, sortFactor=2, byTimeStamp=false) => dispatch => (
    ReadableAPIUtil
        .fetchPostsByCategory(category)
        .then(posts => {
            if(sortFactor > 0) {
                posts.sort((a,b) => {
                    const sortValue = (sortFactor === 1) ? 1 : -1;
                    if(byTimeStamp){
                        return sortValue * (a.timestamp - b.timestamp);
                    }
                    return sortValue * (a.voteScore - b.voteScore);
                });
            }
            dispatch(receivePosts(posts));
        })
);

export const clearFilterCategoryFromPosts = () => dispatch => (
    ReadableAPIUtil
        .fetchPosts()
        .then(posts => dispatch(receivePosts(posts)))
);

export const createNewPost = (newPost) => dispatch => (
    ReadableAPIUtil
        .createNewPost(newPost)
        .then(post => dispatch(createPost(post)))
);

export const votePostUp = (id) => dispatch => (
    ReadableAPIUtil
        .votePostUp(id)
        .then(post => dispatch(updatePostVote(post)))
);

export const votePostDown = (id) => dispatch => (
    ReadableAPIUtil
        .votePostDown(id)
        .then(post => dispatch(updatePostVote(post)))
);