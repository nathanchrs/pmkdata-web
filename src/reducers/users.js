import {
  fetchDefaultState, filterDefaultState, sortDefaultState, paginationDefaultState,
  fetchSuccessReducer, fetchFailureReducer
} from './common/fetch';
import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../actions/users';

const defaultState = Object.assign(
  fetchDefaultState,
  filterDefaultState,
  sortDefaultState,
  paginationDefaultState
);

export default function userReducer (state = defaultState, action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return fetchSuccessReducer(state, action, 'username');
    case FETCH_USERS_FAILURE:
      return fetchFailureReducer(state, action);
    
    default:
      return state;
  }
}
