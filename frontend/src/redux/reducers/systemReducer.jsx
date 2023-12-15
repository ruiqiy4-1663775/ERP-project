import { SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE, CLEAR_MESSAGE } from "../actions/actionTypes";

const initialState = {
    message: null,
    type: null // success/error
}

export default function systemReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return { ...state, message: action.payload, type: 'error' };
        case CLEAR_MESSAGE:
            return {
                ...initialState
            };
        case SET_SUCCESS_MESSAGE:
            return {
                ...state,
                message: action.payload, type: 'success'
            }
        default:
            return state;
    }
}