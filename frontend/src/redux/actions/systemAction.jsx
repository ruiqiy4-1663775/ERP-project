import { CLEAR_MESSAGE, SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE } from "./actionTypes";
// systemMessage is string
export const setErrorMessage = (systemMessage) => ({
    type: SET_ERROR_MESSAGE,
    payload: systemMessage
});

export const setSuccessMessage = (systemMessage) => ({
    type: SET_SUCCESS_MESSAGE,
    payload: systemMessage
})

// This is used to close the system dialog
export const clearMessage = () => ({
    type : CLEAR_MESSAGE
})