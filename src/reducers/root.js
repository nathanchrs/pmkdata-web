import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

export const RESET_REDUX_STATE = 'RESET_REDUX_STATE';

const appReducer = combineReducers({
  form: reduxFormReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_REDUX_STATE) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
