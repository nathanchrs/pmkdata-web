import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './actions';
import addPagination from '../../common/components/Pagination/reducer';

const defaultState = { data: [], isFetching: false, error: false };

function usersReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { data: [], isFetching: true, error: false };
    case FETCH_USERS_SUCCESS:
      return { data: action.payload.data, isFetching: false, error: false };
    case FETCH_USERS_FAILURE:
      return { data: [], isFetching: false, error: true };

    default:
      return state;
  }
}

export default addPagination(usersReducer, 'users');