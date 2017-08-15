import cloneDeep from 'lodash.clonedeep';
import { FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE, UPDATE_EVENT_SUCCESS, CREATE_EVENT_SUCCESS, DELETE_EVENT_SUCCESS } from './actions';
import addPagination from '../../common/components/Pagination/reducer';

const defaultState = { data: [], isFetching: false, error: false };

function eventReducer (state = defaultState, action) {
  let newState;
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      newState = cloneDeep(state);
      if (action.error) {
        return Object.assign(newState, { data: [],
          isFetching: false,
          error: 'Data tidak dapat diakses. Cek koneksi ke server dan coba beberapa saat lagi.' });
      } else {
        return Object.assign(newState, {isFetching: true, error: false});
      }
    case FETCH_EVENTS_SUCCESS:
      newState = cloneDeep(state);
      return Object.assign(newState, { data: action.payload.data, isFetching: false, error: false });
    case FETCH_EVENTS_FAILURE:
      newState = cloneDeep(state);
      return Object.assign(newState, { data: [],
        isFetching: false,
        error: 'Terjadi kesalahan pada server. Coba beberapa saat lagi.' });

    case UPDATE_EVENT_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.map(
        item => item.id === action.meta.updateKey ? Object.assign(item, action.meta.updateBody) : item
      );
      return newState;

    case CREATE_EVENT_SUCCESS:
      newState = cloneDeep(state);
      newState.data.push(action.payload);
      console.log(newState); // DEBUG
      return newState;

    case DELETE_EVENT_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.filter(
        item => item.id !== action.meta.deleteKey
      );
      return newState;

    default:
      return state;
  }
}

export default addPagination(eventReducer, 'events');
