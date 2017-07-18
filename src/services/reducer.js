import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import sessionReducer from './session/reducer';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  session: sessionReducer,
  users: usersReducer
});

export default rootReducer;
