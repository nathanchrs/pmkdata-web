import cloneDeep from 'lodash.clonedeep';
import { FETCH_INTERACTION_DETAIL_REQUEST, FETCH_INTERACTION_DETAIL_SUCCESS, FETCH_INTERACTION_DETAIL_FAILURE, UPDATE_INTERACTION_DETAIL_SUCCESS, CREATE_INTERACTION_DETAIL_SUCCESS, DELETE_INTERACTION_DETAIL_SUCCESS } from './actions';
import addPagination from '../../common/components/Pagination/reducer';

const defaultState = { data: {}, isFetching: false, error: false };

function interactionDetailReducer (state = defaultState, action) {
  let newState;
  switch (action.type) {
    case FETCH_INTERACTION_DETAIL_REQUEST:
      newState = cloneDeep(state);
      if (action.error) {
        return Object.assign(newState, { data: {},
          isFetching: false,
          error: 'Data tidak dapat diakses. Cek koneksi ke server dan coba beberapa saat lagi.' });
      } else {
        return Object.assign(newState, {isFetching: true, error: false});
      }
    case FETCH_INTERACTION_DETAIL_SUCCESS:
      newState = cloneDeep(state);
      return Object.assign(newState, { data: action.payload, isFetching: false, error: false });
    case FETCH_INTERACTION_DETAIL_FAILURE:
      newState = cloneDeep(state);
      return Object.assign(newState, { data: {},
        isFetching: false,
        error: 'Terjadi kesalahan pada server. Coba beberapa saat lagi.' });

    case UPDATE_INTERACTION_DETAIL_SUCCESS:
      newState = cloneDeep(state);
      console.log(newState); // DEBUG
      return newState;

    case CREATE_INTERACTION_DETAIL_SUCCESS:
      newState = cloneDeep(state);
      newState.data.push(action.payload);
      console.log(newState); // DEBUG
      return newState;

    case DELETE_INTERACTION_DETAIL_SUCCESS:
      newState = cloneDeep(state);
      newState.data.mentee = newState.data.mentee.filter(
        item => item.participant_id !== action.meta.deleteKey
      );
      console.log(newState); // DEBUG
      return newState;

    default:
      return state;
  }
}

export default addPagination(interactionDetailReducer, 'interactions');
