const defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");
defaultHeaders.append("Authorization", "Nothing to do");

const defaultGetOptions = {
    method: 'GET',
    headers: defaultHeaders,
    mode: 'cors'
};

const defaultDeleteOptions = Object.assign(Object.assign({}, defaultGetOptions), {method: 'DELETE'});

export function fetchCategories() {
    return fetch(`http://localhost:3001/categories`, defaultGetOptions)
        .then((res) => res.json())
        .then(({categories}) => categories);
};

export function fetchPosts() {
    return fetch(`http://localhost:3001/posts`, defaultGetOptions)
        .then((res) => res.json());
}

export function deletePost(id) {
    return fetch(`http://localhost:3001/posts/${id}`, defaultDeleteOptions)
        .then((res) => res.json());
}