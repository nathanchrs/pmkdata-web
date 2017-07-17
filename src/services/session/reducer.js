import { LOGIN_SUCCESS, LOGOUT_SUCCESS, CLEAR_SESSION } from './actions';

const defaultState = { user: undefined };

export default function sessionReducer(state = defaultState, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return { user: action.payload };

    case LOGOUT_SUCCESS:
    case CLEAR_SESSION:
      return {};

    default:
      return state;
  }
}
