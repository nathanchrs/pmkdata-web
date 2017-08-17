import cloneDeep from 'lodash.clonedeep';
import {
  FETCH_USER_MENTEES_REQUEST, FETCH_USER_MENTEES_SUCCESS, FETCH_USER_MENTEES_FAILURE
} from './actions';

const defaultState = {data: [], isFetching: false, error: false};

function menteesReducer (state = defaultState, action) {
  let newState;
  switch (action.type) {
    case FETCH_USER_MENTEES_REQUEST:
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
    case FETCH_USER_MENTEES_SUCCESS:
      newState = cloneDeep(state);
      return Object.assign(newState, {data: action.payload, isFetching: false, error: false});
    case FETCH_USER_MENTEES_FAILURE:
      newState = cloneDeep(state);
      return Object.assign(newState, {
        data: [],
        isFetching: false,
        error: 'Terjadi kesalahan pada server. Coba beberapa saat lagi.'
      });

    default:
      return state;
  }
}

export default menteesReducer;
