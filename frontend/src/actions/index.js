import * as ReadableAPIUtil from '../utils/Api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
export const UPDATE_ORDER_TIME_STAMP = 'UPDATE_ORDER_TIME_STAMP';
export const UPDATE_ORDER_VOTE_SCORE = 'UPDATE_ORDER_VOTE_SCORE';
export const UPDATE_CATEGORY_FILTER = 'UPDATE_CATEGORY_FILTER';

export const RECEIVE_POST_DETAIL = 'RECEIVE_POST_DETAIL';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const receiveCategories = (categories) => ({
        type: RECEIVE_CATEGORIES,
        categories
    });

export const receivePosts = (posts) => ({
        type: RECEIVE_POSTS,
        posts
    });

export const receivePostDetail = (post) => ({
        type: RECEIVE_POST_DETAIL,
        post
});

export const receivePostComments = (comments) => ({
        type: RECEIVE_POST_COMMENTS,
        comments
});

export const removePost = (post) => ({
        type: REMOVE_POST,
        post
    });

export const removeComment = (comment) => ({
        type: REMOVE_COMMENT,
        comment
    });

export const createPost = (newPost) => ({
        type: CREATE_POST,
        newPost
    });

export const updatePost = (updatePost) => ({
        type: UPDATE_POST,
        updatePost
    });

export const updatePostVote = (post) => ({
        type: UPDATE_POST_VOTE,
        post
    });

export const updateCommentVote = (comment) => ({
        type: UPDATE_COMMENT_VOTE,
        comment
    });

export const updateOrderVoteScore = (post) => ({
        type: UPDATE_ORDER_VOTE_SCORE,
        post
    });

export const updateOrderTimeStamp = (post) => ({
        type: UPDATE_ORDER_TIME_STAMP,
        post
    });

export const updateCategoryFilter = (post) => ({
        type: UPDATE_CATEGORY_FILTER,
        post
    });

export const changeOrderTimeStamp = () => (dispatch, getState) => {
        const orderTimeStamp = getState().post;
        const newOrderTimeStamp = (orderTimeStamp === "") ? "asc" : (orderTimeStamp === "desc") ? "" : "desc";
        const newPostState = Object.assign({}, getState().post, {orderTimeStamp: newOrderTimeStamp});
        dispatch(updateOrderTimeStamp(newPostState));
        dispatch(fetchPosts());
    };

export const changeOrderVoteScore = () => (dispatch, getState) => {
        const orderVoteScore = getState().post;
        const newOrderVoteScore = (orderVoteScore === "") ? "asc" : (orderVoteScore === "desc") ? "" : "desc";
        const newPostState = Object.assign({}, getState().post, {orderVoteScore: newOrderVoteScore});
        dispatch(updateOrderVoteScore(newPostState));
        dispatch(fetchPosts());
    };

export const changeCategoryFilter = (category) => (dispatch, getState) =>{
        const newPostState = Object.assign({}, getState().post, {category: category});
        dispatch(updateCategoryFilter(newPostState));
        dispatch(fetchPosts());
    };


export const fetchCategories = () => dispatch => (
        ReadableAPIUtil
            .fetchCategories()
            .then(categories => dispatch(receiveCategories(categories)))
    );

export const fetchPosts = () => (dispatch, getState) => {
        const {orderTimeStamp, orderVoteScore, category} = getState().post;
        const onReceivePosts = (posts) => {
            if(orderVoteScore.length) {
                posts.sort((a,b) => {
                    const sortValue = (orderVoteScore === 'asc') ? 1 : -1;
                    return sortValue * (a.voteScore - b.voteScore);
                });
            }

            if(orderTimeStamp.length) {
                posts.sort((a,b) => {
                    const sortValue = (orderTimeStamp === 'asc') ? 1 : -1;
                    return sortValue * (a.timestamp - b.timestamp);
                });
            }
            
            dispatch(receivePosts(posts));
        };
        if(category.length) {
            return ReadableAPIUtil
                .fetchPostsByCategory(category)
                .then(onReceivePosts)
        }else{
            return ReadableAPIUtil
            .fetchPosts()
            .then(onReceivePosts);
        }
    };

export const deletePost = (id) => dispatch => (
        ReadableAPIUtil
            .deletePost(id)
            .then(post => dispatch(removePost(post)))
    );

export const deleteComment = (id) => dispatch => (
        ReadableAPIUtil
            .deleteComment(id)
            .then(comment => dispatch(removeComment(comment)))
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

export const createNewPost = (newPost) => dispatch => (
        ReadableAPIUtil
            .createNewPost(newPost)
            .then(post => {
                post.isNew = true;
                dispatch(createPost(post))
            })
    );

export const editPost = (editPost) => dispatch => (
        ReadableAPIUtil
            .updatePost(editPost)
            .then(post => {
                dispatch(updatePost(post))
            })
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

export const voteCommentUp = (id) => dispatch => (
        ReadableAPIUtil
            .voteCommentUp(id)
            .then(comment => dispatch(updateCommentVote(comment)))
    );

export const voteCommentDown = (id) => dispatch => (
        ReadableAPIUtil
            .voteCommentDown(id)
            .then(comment => dispatch(updateCommentVote(comment)))
    );

export const fetchPost = (id) => dispatch => (
        ReadableAPIUtil
            .fetchPost(id)
            .then(post => {
                dispatch(receivePostDetail(post));})
    );

export const fetchPostComments = (id) => dispatch => {
        const onReceiveComments = (comments) => {
            comments.sort((a,b) => {
                return -1 * (a.voteScore - b.voteScore);
            });

            dispatch(receivePostComments(comments));
        };
        return ReadableAPIUtil
            .fetchPostComments(id)
            .then(onReceiveComments);
    };