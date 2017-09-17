const defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");
defaultHeaders.append("Authorization", "Nothing to do");

const defaultOptions = {
    method: 'GET',
    headers: defaultHeaders,
    mode: 'cors'
};

export function fetchCategories() {
    return fetch(`http://localhost:3001/categories`, defaultOptions)
        .then((res) => res.json())
        .then(({categories}) => categories);
};

export function fetchPosts() {
    return fetch(`http://localhost:3001/posts`, defaultOptions)
        .then((res) => res.json());
}