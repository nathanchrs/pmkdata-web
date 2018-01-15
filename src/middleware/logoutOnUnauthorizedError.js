import { resetReduxState } from '../actions/session';

export default store => next => action => {
  if (action.payload && action.payload.name === 'ApiError') {
    if (action.payload.status === 401) {
      store.dispatch(resetReduxState());
    }
  }
  return next(action);
};
