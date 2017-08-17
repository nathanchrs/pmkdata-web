import cloneDeep from 'lodash.clonedeep';
import {
  FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS
} from './actions';
import addPagination from '../../common/components/Pagination/reducer';

const defaultState = {data: [], isFetching: false, error: false};

function usersReducer (state = defaultState, action) {
  let newState;
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      newState = cloneDeep(state);
      if (action.error) {
        return Object.assign(newState, {
          data: [],
          isFetching: false,
          error: 'Data tidak dapat diakses. Cek koneksi ke server dan coba beberapa saat lagi.'
        });
      } else {
        return Object.assign(newState, {isFetching: true, error: false});
      }
    case FETCH_USERS_SUCCESS:
      newState = cloneDeep(state);
      return Object.assign(newState, action.payload, {isFetching: false, error: false});
    case FETCH_USERS_FAILURE:
      newState = cloneDeep(state);
      return Object.assign(newState, {
        data: [],
        isFetching: false,
        error: 'Terjadi kesalahan pada server. Coba beberapa saat lagi.'
      });

    case CREATE_USER_SUCCESS:
      newState = cloneDeep(state);
      if (!newState.data) newState.data = [];
      newState.data.push(action.payload);
      return newState;

    case UPDATE_USER_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.map(
        item => item.username === action.meta.updateKey ? Object.assign(item, action.meta.updateBody) : item
      );
      return newState;

    case DELETE_USER_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.filter(
        item => item.username !== action.meta.deleteKey
      );
      return newState;

    default:
      return state;
  }
}

export default addPagination(usersReducer, 'users');
