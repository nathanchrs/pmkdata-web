import { createApiAction } from '../api';
import { createPaginatedApiResponse } from '../../common/components/Pagination/actions';
import { getSortQuery } from '../../common/utils';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE';

export const FETCH_USER_MENTEES_REQUEST = 'FETCH_USER_MENTEES_REQUEST';
export const FETCH_USER_MENTEES_SUCCESS = 'FETCH_USER_MENTEES_SUCCESS';
export const FETCH_USER_MENTEES_FAILURE = 'FETCH_USER_MENTEES_FAILURE';

export const SEARCH_USER_MENTEES_REQUEST = 'SEARCH_USER_MENTEES_REQUEST';
export const SEARCH_USER_MENTEES_SUCCESS = 'SEARCH_USER_MENTEES_SUCCESS';
export const SEARCH_USER_MENTEES_FAILURE = 'SEARCH_USER_MENTEES_FAILURE';

export function register (body) {
  return (dispatch, getState) => {
    if (getState().session.user) {
      return Promise.resolve();
    }

    return (dispatch) => {
      return dispatch(createApiAction({
        endpoint: '/api/users',
        method: 'POST',
        body,
        types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE]
      }));
    };
  };
}

export function createUser (body) {
  return createApiAction({
    endpoint: '/api/users',
    method: 'POST',
    body,
    types: [CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE]
  });
}

export function fetchUsers ({page, perPage, search, sort, filters} = {}) {
  return createApiAction({
    endpoint: '/api/users',
    method: 'GET',
    query: {page, perPage, search, sort: getSortQuery(sort), ...filters},
    types: [FETCH_USERS_REQUEST, createPaginatedApiResponse(FETCH_USERS_SUCCESS, 'users'), FETCH_USERS_FAILURE]
  });
}

export function updateUser (username, body) {
  return createApiAction({
    endpoint: '/api/users/' + username,
    method: 'PATCH',
    body,
    types: [UPDATE_USER_REQUEST, {
      type: UPDATE_USER_SUCCESS,
      meta: {updateKey: username, updateBody: body}
    }, UPDATE_USER_FAILURE]
  });
}

export function deleteUser (username) {
  return createApiAction({
    endpoint: '/api/users/' + username,
    method: 'DELETE',
    types: [DELETE_USER_REQUEST, {type: DELETE_USER_SUCCESS, meta: {deleteKey: username}}, DELETE_USER_FAILURE]
  });
}

export function searchUsers (search) {
  return createApiAction({
    endpoint: '/api/users/search',
    method: 'GET',
    query: {search},
    types: [SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE]
  });
}

export function searchUserMentees (userId, search) {
  return createApiAction({
    endpoint: '/api/users/' + (+userId) + '/mentees/search',
    method: 'GET',
    query: {search},
    types: [SEARCH_USER_MENTEES_REQUEST, SEARCH_USER_MENTEES_SUCCESS, SEARCH_USER_MENTEES_FAILURE]
  });
}

export function fetchUserMentees (userId) {
  return createApiAction({
    endpoint: '/api/users/' + (+userId) + '/mentees',
    method: 'GET',
    types: [FETCH_USER_MENTEES_REQUEST, FETCH_USER_MENTEES_SUCCESS, FETCH_USER_MENTEES_FAILURE]
  });
}
