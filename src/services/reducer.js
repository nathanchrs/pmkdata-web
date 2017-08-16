import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import sessionReducer from './session/reducer';
import usersReducer from './users/reducer';
import studentsReducer from './students/reducer';
import interactionsReducer from './interactions/reducer';

export const RESET_REDUX_STATE = 'RESET_REDUX_STATE';

const appReducer = combineReducers({
  form: reduxFormReducer,
  session: sessionReducer,
  users: usersReducer,
  students: studentsReducer,
  interactions: interactionsReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_REDUX_STATE) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
