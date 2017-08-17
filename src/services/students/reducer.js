import cloneDeep from 'lodash.clonedeep';
import {
  FETCH_STUDENTS_REQUEST, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_FAILURE,
  CREATE_STUDENT_SUCCESS, UPDATE_STUDENT_SUCCESS, DELETE_STUDENT_SUCCESS
} from './actions';
import addPagination from '../../common/components/Pagination/reducer';

const defaultState = {data: [], isFetching: false, error: false};

function studentsReducer (state = defaultState, action) {
  let newState;
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
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
    case FETCH_STUDENTS_SUCCESS:
      newState = cloneDeep(state);
      return Object.assign(newState, action.payload, {isFetching: false, error: false});
    case FETCH_STUDENTS_FAILURE:
      newState = cloneDeep(state);
      return Object.assign(newState, {
        data: [],
        isFetching: false,
        error: 'Terjadi kesalahan pada server. Coba beberapa saat lagi.'
      });

    case CREATE_STUDENT_SUCCESS:
      newState = cloneDeep(state);
      if (!newState.data) newState.data = [];
      newState.data.push(action.payload);
      return newState;

    case UPDATE_STUDENT_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.map(
        item => item.id === action.meta.updateKey ? Object.assign(item, action.meta.updateBody) : item
      );
      return newState;

    case DELETE_STUDENT_SUCCESS:
      newState = cloneDeep(state);
      newState.data = newState.data.filter(
        item => item.id !== action.meta.deleteKey
      );
      return newState;

    default:
      return state;
  }
}

export default addPagination(studentsReducer, 'students');
