import cloneDeep from 'lodash.clonedeep';
import { FETCH_MENTEES_REQUEST, FETCH_MENTEES_SUCCESS, FETCH_MENTEES_FAILURE, UPDATE_MENTEE_SUCCESS, CREATE_MENTEE_SUCCESS, DELETE_MENTEE_SUCCESS } from './actions';
import addPagination from '../../common/components/Pagination/reducer';

const defaultState = { data: [], isFetching: false, error: false };

function menteeReducer (state = defaultState, action) {
  let newState;
  switch (action.type) {
    case FETCH_MENTEES_REQUEST:
      newState = cloneDeep(state);
      if (action.error) {
        return Object.assign(newState, { data: [],
          isFetching: false,
          error: 'Data tidak dapat diakses. Cek koneksi ke server dan coba beberapa saat lagi.' });
      } else {
        return Object.assign(newState, {isFetching: true, error: false});
      }
    case FETCH_MENTEES_SUCCESS:
      // console.log(action.payload);
      newState = cloneDeep(state);
      return Object.assign(newState, { data: action.payload.data, isFetching: false, error: false });
    case FETCH_MENTEES_FAILURE:
      newState = cloneDeep(state);
      return Object.assign(newState, { data: [],
        isFetching: false,
        error: 'Terjadi kesalahan pada server. Coba beberapa saat lagi.' });

    case UPDATE_MENTEE_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.map(
        item => item.id === action.meta.updateKey ? Object.assign(item, action.meta.updateBody) : item
      );
      console.log(newState); // DEBUG
      return newState;

    case CREATE_MENTEE_SUCCESS:
      newState = cloneDeep(state);
      newState.data.push(action.payload);
      console.log(newState); // DEBUG
      return newState;

    case DELETE_MENTEE_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.filter(
        item => item.id !== action.meta.deleteKey
      );
      console.log(newState); // DEBUG
      return newState;

    default:
      return state;
  }
}

export default addPagination(menteeReducer, 'mentees');
