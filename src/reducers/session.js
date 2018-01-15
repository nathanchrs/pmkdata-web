import { LOGIN_SUCCESS } from '../actions/session';

const defaultState = { user: null };

export default function sessionReducer (state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { user: action.payload };

    default:
      return state;
  }
}
