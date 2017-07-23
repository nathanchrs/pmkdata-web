import { SET_PAGE, SET_PER_PAGE, SET_LAST_PAGE } from './actions';
import cloneDeep from 'lodash.clonedeep';

export default function addPagination(reducer, storeKey = '') {
  return (state = {}, action) => {
    if (action.payload && storeKey === action.payload.storeKey) {
      switch (action.type) {
        case SET_PAGE:
          state = cloneDeep(state);
          state.currentPage = action.payload.page;
          return state;
        case SET_PER_PAGE:
          state = cloneDeep(state);
          state.perPage = action.payload.perPage;
          return state;
        case SET_LAST_PAGE:
          state = cloneDeep(state);
          state.lastPage = action.payload.lastPage;
          return state;
        default:
          return reducer(state, action);
      }
    } else {
      return reducer(state, action);
    }
  };
}
