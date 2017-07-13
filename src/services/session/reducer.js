import {
  LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_FAILURE,
  LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_ERROR
} from './actions';


const defaultState = { isFetching: false, error: undefined, failed: undefined, user: undefined };

export default function sessionReducer(state = defaultState, action) {
  switch(action.type) {
    case LOGIN_START:
      return { ...state, isFetching: true };
    case LOGIN_SUCCESS:
      return { isFetching: false, user: action.user };
    case LOGIN_FAILURE:
      return { ...state, isFetching: false, failed: true };

    case LOGOUT_START:
      return { ...state, isFetching: true };
    case LOGOUT_SUCCESS:
      return { isFetching: false };

    case LOGIN_ERROR:
    case LOGOUT_ERROR:
      return { ...state, isFetching: false, error: true, failed: false };

    default:
      return state;
  }
}
