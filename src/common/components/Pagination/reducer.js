import { SET_PAGE, SET_PER_PAGE } from './actions';
import cloneDeep from 'lodash.clonedeep';

export default function addPagination(reducer, storeKey = '') {
  return (state = {}, action) => {
    let newState;
    if (action.payload && storeKey === action.payload.storeKey) {
      switch (action.type) {
        case SET_PAGE:
          newState = cloneDeep(state);
          newState.page = action.payload.page;
          return newState;
        case SET_PER_PAGE:
          newState = cloneDeep(state);
          newState.perPage = action.payload.perPage;
          return newState;
        default:
          return reducer(state, action);
      }
    } if (action.payload && action.meta && action.meta.pagination && action.meta.pagination.storeKey === storeKey) {
      let newState = cloneDeep(state);
      newState.lastPage = action.payload.lastPage;
      return reducer(newState, action);
    } else {
      return reducer(state, action);
    }
  };
}
