import keyBy from 'lodash.keyby';

const perPageDefault = 20;

export const fetchDefaultState = { data: {}, error: null };
export const filterDefaultState = { filters: {} };
export const sortDefaultState = { sort: [] };
export const paginationDefaultState = { page: 1, perPage: perPageDefault };

export function fetchSuccessReducer (state = fetchDefaultState, action, key = 'id') {
  return {
    ...state,
    data: keyBy(action.payload.data, key),
    error: null,
    filters: action.payload.filters || {},
    sort: action.payload.sort,
    page: action.payload.page || 1,
    perPage: action.payload.perPage || perPageDefault
  };
}

export function fetchFailureReducer(state = fetchDefaultState, action) {
  return {
    ...state,
    error: true
  };
}
