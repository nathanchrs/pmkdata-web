
export const fetchDefaultState = { data: {}, error: {} };
export const filterDefaultState = { filters: {} };
export const sortDefaultState = { sort: {} };
export const paginationDefaultState = { page: 1, perPage: 20 };

export function fetchSuccessReducer (state = fetchDefaultState, action) {
  return {
    data: action.payload.data,
    filters: action.payload.filters,
    sort: action.payload.sort,
    page: action.payload.page,
    perPage: action.payload.perPage,
    ...state
  };
}

export function fetchFailureReducer(state = fetchDefaultState, action) {
  return {
    error: true,
    ...state
  };
}
