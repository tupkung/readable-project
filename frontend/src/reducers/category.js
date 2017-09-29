import {
    RECEIVE_CATEGORIES
} from '../actions/types';

export default function category (state={categories:[]}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES :
            const {categories} = action;
            return {
                ...state,
                categories
            };
        default :
            return state;
    }
}