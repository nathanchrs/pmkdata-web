import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import sessionReducer from './session/reducer';
import usersReducer from './users/reducer';
import eventsReducer from './events/reducer';

export const RESET_REDUX_STATE = 'RESET_REDUX_STATE';

const appReducer = combineReducers({
  form: reduxFormReducer,
  session: sessionReducer,
  users: usersReducer,
  events: eventsReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_REDUX_STATE) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
