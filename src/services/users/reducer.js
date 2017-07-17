import { REGISTER_FAILURE } from './actions';

const defaultState = [];

export default function usersReducer(state = defaultState, action) {
  switch(action.type) {
    case REGISTER_FAILURE:
      return { ...state, error: true };

    default:
      return state;
  }
}