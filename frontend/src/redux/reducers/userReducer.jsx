// src/reducers/someReducer.js
import { SET_USER, CLEAR_USER } from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.payload, isLoggedIn: true };
        case CLEAR_USER:
            return {
                ...initialState
            };
        default:
            return state;
    }
}
