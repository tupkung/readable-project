const defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");
defaultHeaders.append("Authorization", "Nothing to do");

const defaultOptions = {
    headers: defaultHeaders,
    mode: 'cors'
};

const defaultGetOptions = Object.assign(Object.assign({}, defaultOptions), {method: 'GET'});

const defaultDeleteOptions = Object.assign(Object.assign({}, defaultOptions), {method: 'DELETE'});

const defaultPostOptions = Object.assign(Object.assign({}, defaultOptions), {method: "POST"});

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

export function fetchPostComments(id) {
    return fetch(`http://localhost:3001/posts/${id}/comments`, defaultGetOptions)
        .then((res) => res.json());
}

export function createNewPost(newPost) {
    let data = new FormData();
    data.append("json", JSON.stringify(newPost));
    const newPostOptions = Object.assign({}, defaultPostOptions, {body: JSON.stringify(newPost)});
    return fetch(`http://localhost:3001/posts`, newPostOptions)
        .then((res) => res.json());
}

export function updatePost(updatePost) {
    let data = new FormData();
    data.append("json", JSON.stringify(updatePost));
    const newPutOptions = Object.assign({}, defaultPutOptions, {body: JSON.stringify(updatePost)});
    return fetch(`http://localhost:3001/posts/${updatePost.id}`, newPutOptions)
        .then((res) => res.json());

}