import cloneDeep from 'lodash.clonedeep';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, UPDATE_USER_SUCCESS } from './actions';
import addPagination from '../../common/components/Pagination/reducer';

const defaultState = { data: [], isFetching: false, error: false };

function usersReducer(state = defaultState, action) {
  let newState;
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      newState = cloneDeep(state);
      if (action.error) {
        return Object.assign(newState, { data: [], isFetching: false,
          error: 'Data tidak dapat diakses. Cek koneksi ke server dan coba beberapa saat lagi.' });
      } else {
        return Object.assign(newState, {isFetching: true, error: false});
      }
    case FETCH_USERS_SUCCESS:
      newState = cloneDeep(state);
      return Object.assign(newState, { data: action.payload.data, isFetching: false, error: false });
    case FETCH_USERS_FAILURE:
      newState = cloneDeep(state);
      return Object.assign(newState, { data: [], isFetching: false,
        error: 'Terjadi kesalahan pada server. Coba beberapa saat lagi.' });

    case UPDATE_USER_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.map(
        item => item.username === action.meta.updateKey ? Object.assign(item, action.meta.updateBody) : item
      );
      console.log(newState); // DEBUG
      return newState;

    default:
      return state;
  }
}

export default addPagination(usersReducer, 'users');
