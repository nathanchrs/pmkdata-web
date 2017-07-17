import { clearSession } from './session/actions';

export default store => next => action => {
  if (action.payload && action.payload.constructor.name === 'ApiError') {
    if (action.payload.status === 401) store.dispatch(clearSession());
  }
  return next(action);
}
