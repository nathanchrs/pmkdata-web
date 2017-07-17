import { combineReducers } from 'redux';
import sessionReducer from './session/reducer';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer
});

export default rootReducer;
