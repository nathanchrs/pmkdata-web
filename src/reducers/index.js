import { reducer as reduxFormReducer } from 'redux-form';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './users';

export const RESET_REDUX_STATE = 'RESET_REDUX_STATE';

const persistConfig = { key: 'pmkdata', storage, debug: true };

const appReducer = persistCombineReducers(persistConfig, {
  form: reduxFormReducer,
  users: userReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_REDUX_STATE) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
