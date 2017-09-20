import * as ReadableAPIUtil from '../utils/Api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';

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
        .fetchPosts(sortFactor, byTimeStamp)
        .then(posts => {
            const searchPosts = posts.filter(post => post.category === category);
            dispatch(receivePosts(searchPosts));
        })
);

export const clearFilterCategoryFromPosts = () => dispatch => (
    ReadableAPIUtil
        .fetchPosts()
        .then(posts => dispatch(receivePosts(posts)))
);