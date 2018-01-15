import { apiCreate, apiFetch, apiUpdate, apiDelete } from './api';

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

export function createUser(body) {
  return apiCreate('/users', body, [CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE]);
}

export function fetchUsers(query = {}) {
  return apiFetch('/users', query, [FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE]);
}

export function updateUser(username, body) {
  return apiUpdate('/users/' + username, body,[UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE]);
}

export function deleteUser(username) {
  return apiDelete('/users/' + username, [DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE]);
}
