import * as ReadableAPIUtil from '../utils/Api';

// category actions

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const UPDATE_CATEGORY_FILTER = 'UPDATE_CATEGORY_FILTER';

// category action creators
export const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
});


// category middleware action creators
export const fetchCategories = () => dispatch => (
    ReadableAPIUtil
        .fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
);

export const changeCategoryFilter = (category) => (dispatch, getState) =>{
    const newPostState = Object.assign({}, getState().post, {category: category});
    dispatch(updateCategoryFilter(newPostState));
    dispatch(fetchPosts());
};
//-------------------------------------------------------------


// post actions
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
export const UPDATE_ORDER_TIME_STAMP = 'UPDATE_ORDER_TIME_STAMP';
export const UPDATE_ORDER_VOTE_SCORE = 'UPDATE_ORDER_VOTE_SCORE';
export const RECEIVE_POST_DETAIL = 'RECEIVE_POST_DETAIL';

// post action creator
export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

export const receivePostDetail = (post) => ({
    type: RECEIVE_POST_DETAIL,
    post
});

export const removePost = (post) => ({
    type: REMOVE_POST,
    post
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

export const updateCategoryFilter = (post) => ({
    type: UPDATE_CATEGORY_FILTER,
    post
});

export const updateOrderVoteScore = (post) => ({
    type: UPDATE_ORDER_VOTE_SCORE,
    post
});

export const updateOrderTimeStamp = (post) => ({
    type: UPDATE_ORDER_TIME_STAMP,
    post
});

// post middleware action creator
export const changeOrderVoteScore = () => (dispatch, getState) => {
    const orderVoteScore = getState().post;
    const newOrderVoteScore = (orderVoteScore === "") ? "asc" : (orderVoteScore === "desc") ? "" : "desc";
    const newPostState = Object.assign({}, getState().post, {orderVoteScore: newOrderVoteScore});
    dispatch(updateOrderVoteScore(newPostState));
    dispatch(fetchPosts());
};

export const changeOrderTimeStamp = () => (dispatch, getState) => {
    const orderTimeStamp = getState().post;
    const newOrderTimeStamp = (orderTimeStamp === "") ? "asc" : (orderTimeStamp === "desc") ? "" : "desc";
    const newPostState = Object.assign({}, getState().post, {orderTimeStamp: newOrderTimeStamp});
    dispatch(updateOrderTimeStamp(newPostState));
    dispatch(fetchPosts());
};

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

    const getTheComments = (posts) => {
        let promises = posts.map(post=>(
            ReadableAPIUtil
                .fetchPostComments(post.id)
                .then(comments => {
                    post.commentsNumber = comments.length;
                    return post;
                })
        ));
        return Promise.all(promises);   
    };

    if(category.length) {
        return ReadableAPIUtil
            .fetchPostsByCategory(category)
            .then(getTheComments)
            .then(onReceivePosts);
    }else{
        return ReadableAPIUtil
        .fetchPosts()
        .then(getTheComments)
        .then(onReceivePosts);
    }
};

export const deletePost = (id) => dispatch => (
    ReadableAPIUtil
        .deletePost(id)
        .then(post => dispatch(removePost(post)))
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

export const fetchPost = (id) => dispatch => (
    ReadableAPIUtil
        .fetchPost(id)
        .then(post => {
            dispatch(receivePostDetail(post));})
);

//----------------------------------------------------------------------------

// comment actions
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

// comment action creator
export const receivePostComments = (comments) => ({
        type: RECEIVE_POST_COMMENTS,
        comments
});

export const removeComment = (comment) => ({
        type: REMOVE_COMMENT,
        comment
    });

export const createComment = (newComment) => ({
        type: CREATE_COMMENT,
        newComment
    });

export const updateComment = (updateComment) => ({
        type: UPDATE_COMMENT,
        updateComment
    });

export const updateCommentVote = (comment) => ({
        type: UPDATE_COMMENT_VOTE,
        comment
    });

// comment middleware action creator
export const deleteComment = (id) => dispatch => (
        ReadableAPIUtil
            .deleteComment(id)
            .then(comment => dispatch(removeComment(comment)))
    );

export const createNewComment = (newComment) => dispatch => (
        ReadableAPIUtil
            .createNewComment(newComment)
            .then(comment => {
                comment.isNew = true;
                dispatch(createComment(comment))
            })
    );

export const editComment = (editComment) => dispatch => (
        ReadableAPIUtil
            .updateComment(editComment)
            .then(comment => {
                dispatch(updateComment(comment))
            })
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