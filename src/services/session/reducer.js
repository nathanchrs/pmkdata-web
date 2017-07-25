import { LOGIN_SUCCESS } from './actions';

const defaultState = { user: undefined };

export default function sessionReducer(state = defaultState, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return { user: action.payload };

    default:
      return state;
  }
}
