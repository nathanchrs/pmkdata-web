import { clearSession } from './session/actions';
import { ValidationError } from '../common/validation';

export default store => next => action => {
  if (action.payload && action.payload.name === 'ApiError') {
    if (action.payload.status === 401) {
      store.dispatch(clearSession());
    } else if (action.payload.status === 422) {
      return next({
        type: action.type,
        payload: new ValidationError(action.payload.response),
        error: true,
        meta: {
          serverValidationError: true
        }
      });
    }
  }
  return next(action);
}
