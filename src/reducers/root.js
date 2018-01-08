import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as reduxUiReducer } from 'redux-ui';
import { reducer as reduxFormReducer } from 'redux-form';

export const RESET_REDUX_STATE = 'RESET_REDUX_STATE';

const persistConfig = { key: 'pmkdata', storage, blacklist: [], debug: true };

const appReducer = persistCombineReducers(persistConfig, {
  form: reduxFormReducer,
  ui: reduxUiReducer  
});

const rootReducer = (state, action) => {
  if (action.type === RESET_REDUX_STATE) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
