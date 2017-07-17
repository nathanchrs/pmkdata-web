import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  CLEAR_SESSION
} from './actions';

const defaultState = { isFetching: false, error: undefined, failed: undefined, user: undefined };

export default function sessionReducer(state = defaultState, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case LOGIN_SUCCESS:
      return { isFetching: false, user: action.payload };
    case LOGIN_FAILURE:
      if (action.payload.status === 401) {
        return {...state, isFetching: false, failed: true};
      } else {
        return { ...state, isFetching: false, error: true, failed: false };
      }

    case LOGOUT_REQUEST:
      return { ...state, isFetching: true };
    case LOGOUT_SUCCESS:
    case CLEAR_SESSION:
      return { isFetching: false };
    case LOGOUT_FAILURE:
      return { ...state, isFetching: false, error: true, failed: false };

    default:
      return state;
  }
}
