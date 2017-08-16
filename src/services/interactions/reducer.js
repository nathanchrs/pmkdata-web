import cloneDeep from 'lodash.clonedeep';
import {
  FETCH_INTERACTIONS_REQUEST, FETCH_INTERACTIONS_SUCCESS, FETCH_INTERACTIONS_FAILURE,
  CREATE_INTERACTION_SUCCESS, UPDATE_INTERACTION_SUCCESS, DELETE_INTERACTION_SUCCESS
} from './actions';
import addPagination from '../../common/components/Pagination/reducer';

const defaultState = {data: [], isFetching: false, error: false};

function interactionsReducer (state = defaultState, action) {
  let newState;
  switch (action.type) {
    case FETCH_INTERACTIONS_REQUEST:
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
    case FETCH_INTERACTIONS_SUCCESS:
      newState = cloneDeep(state);
      return Object.assign(newState, action.payload, {isFetching: false, error: false});
    case FETCH_INTERACTIONS_FAILURE:
      newState = cloneDeep(state);
      return Object.assign(newState, {
        data: [],
        isFetching: false,
        error: 'Terjadi kesalahan pada server. Coba beberapa saat lagi.'
      });

    case CREATE_INTERACTION_SUCCESS:
      newState = cloneDeep(state);
      if (!newState.data) newState.data = [];
      newState.data.push(action.payload);
      return newState;

    case UPDATE_INTERACTION_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.map(
        item => item.id === action.meta.updateKey ? Object.assign(item, action.meta.updateBody) : item
      );
      return newState;

    case DELETE_INTERACTION_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.filter(
        item => item.id !== action.meta.deleteKey
      );
      return newState;

    default:
      return state;
  }
}

export default addPagination(interactionsReducer, 'interactions');
