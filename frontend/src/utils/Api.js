
// Set Default Header for using to request to API server
const defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");
defaultHeaders.append("Authorization", "Nothing to do");

// Set Default Options
const defaultOptions = {
    headers: defaultHeaders,
    mode: 'cors'
};

// Set Default Method Get options
const defaultGetOptions = Object.assign(Object.assign({}, defaultOptions), {method: 'GET'});

// Set Default Method Delete options
const defaultDeleteOptions = Object.assign(Object.assign({}, defaultOptions), {method: 'DELETE'});

// Set Default Method Post options
const defaultPostOptions = Object.assign(Object.assign({}, defaultOptions), {method: "POST"});

// Set Default Method Put options
const defaultPutOptions = Object.assign(Object.assign({}, defaultOptions), {method: "PUT"});

export function fetchCategories() {
    return fetch(`http://localhost:3001/categories`, defaultGetOptions)
        .then((res) => res.json())
        .then(({categories}) => categories);
};

export function fetchPosts() {
    return fetch(`http://localhost:3001/posts`, defaultGetOptions)
        .then((res) => res.json());
}

export function fetchPost(id) {
    return fetch(`http://localhost:3001/posts/${id}`, defaultGetOptions)
        .then((res) => res.json());
}

export function fetchPostsByCategory(category) {
    return fetch(`http://localhost:3001/${category}/posts`, defaultGetOptions)
        .then((res) => res.json());
}

export function deletePost(id) {
    return fetch(`http://localhost:3001/posts/${id}`, defaultDeleteOptions)
        .then((res) => res.json());
}

export function votePostUp(id) {
    const votePostUpOptions = Object.assign({}, defaultPostOptions, {body: JSON.stringify({option: "upVote"})});
    return fetch(`http://localhost:3001/posts/${id}`, votePostUpOptions)
        .then((res) => res.json());
}

export function votePostDown(id) {
    const votePostUpOptions = Object.assign({}, defaultPostOptions, {body: JSON.stringify({option: "downVote"})});
    return fetch(`http://localhost:3001/posts/${id}`, votePostUpOptions)
        .then((res) => res.json());
}

export function voteCommentUp(id) {
    const voteCommentUpOptions = Object.assign({}, defaultPostOptions, {body: JSON.stringify({option: "upVote"})});
    return fetch(`http://localhost:3001/comments/${id}`, voteCommentUpOptions)
        .then((res) => res.json());
}

export function voteCommentDown(id) {
    const voteCommentDownOptions = Object.assign({}, defaultPostOptions, {body: JSON.stringify({option: "downVote"})});
    return fetch(`http://localhost:3001/comments/${id}`, voteCommentDownOptions)
        .then((res) => res.json());
}

export function deleteComment(id) {
    return fetch(`http://localhost:3001/comments/${id}`, defaultDeleteOptions)
        .then((res) => res.json());
}

export function fetchPostComments(id) {
    return fetch(`http://localhost:3001/posts/${id}/comments`, defaultGetOptions)
        .then((res) => res.json());
}

export function createNewPost(newPost) {
    const newPostOptions = Object.assign({}, defaultPostOptions, {body: JSON.stringify(newPost)});
    return fetch(`http://localhost:3001/posts`, newPostOptions)
        .then((res) => res.json());
}

export function updatePost(updatePost) {
    const newPutOptions = Object.assign({}, defaultPutOptions, {body: JSON.stringify(updatePost)});
    return fetch(`http://localhost:3001/posts/${updatePost.id}`, newPutOptions)
        .then((res) => res.json());

}

export function createNewComment(newComment) {
    const newCommentOptions = Object.assign({}, defaultPostOptions, {body: JSON.stringify(newComment)});
    return fetch(`http://localhost:3001/comments`, newCommentOptions)
        .then((res) => res.json());
}

export function updateComment(updateComment) {
    const updateCommentOptions = Object.assign({}, defaultPutOptions, {body: JSON.stringify(updateComment)});
    return fetch(`http://localhost:3001/comments/${updateComment.id}`, updateCommentOptions)
        .then((res) => res.json());
}