import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE, CLEAR_SESSION } from './actions';

const defaultState = { error: undefined, failed: undefined, user: undefined };

export default function sessionReducer(state = defaultState, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return { user: action.payload };
    case LOGIN_FAILURE:
      if (action.payload.status === 401) {
        return {...state, failed: true};
      } else {
        return { ...state, error: true, failed: false };
      }

    case LOGOUT_SUCCESS:
    case CLEAR_SESSION:
      return {};
    case LOGOUT_FAILURE:
      return { ...state, error: true, failed: false };

    default:
      return state;
  }
}
