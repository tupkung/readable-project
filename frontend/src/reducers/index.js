import {combineReducers} from 'redux';
import category from './category';
import post from './post';
import postDetail from './postDetail';
import comment from './comment';

export default combineReducers({
    category,
    post,
    postDetail,
    comment
});