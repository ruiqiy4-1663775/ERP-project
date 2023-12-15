import { combineReducers } from 'redux';
import userReducer from './userReducer';
import systemReducer from './systemReducer';
export default combineReducers({
    user: userReducer,
    systemMessage: systemReducer,
    // language: languageReducer
  // other reducers
});
