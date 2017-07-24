import { createApiAction } from '../api';
import { createPaginatedApiResponse } from '../../common/components/Pagination/actions';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export function register(body) {
  return (dispatch, getState) => {
    if (getState().session.user) {
      return Promise.resolve();
    }

    return dispatch(createApiAction({
      endpoint: '/api/users',
      method: 'POST',
      body,
      types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE]
    }));
  };
}

export function fetchUsers({ page, perPage, search, sort, filters } = {}) {
  return createApiAction({
    endpoint: '/api/users',
    method: 'GET',
    query: { page, perPage, search, sort, ...filters },
    types: [FETCH_USERS_REQUEST, createPaginatedApiResponse(FETCH_USERS_SUCCESS, 'users'), FETCH_USERS_FAILURE]
  });
}

