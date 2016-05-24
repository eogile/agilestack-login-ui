/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import currentUserReducer from './currentUserReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    currentUser: currentUserReducer,
});

export default rootReducer;
