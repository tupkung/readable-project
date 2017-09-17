import * as ReadableAPIUtil from '../utils/Api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

export const fetchCategories = () => dispatch => (
    ReadableAPIUtil
        .fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
);

export const fetchPosts = () => dispatch => (
    ReadableAPIUtil
        .fetchPosts()
        .then(posts => dispatch(receivePosts(posts)))
);

