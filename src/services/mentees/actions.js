import { createApiAction } from '../api';

export const ADD_MENTEE_REQUEST = 'ADD_MENTEE_REQUEST';
export const ADD_MENTEE_SUCCESS = 'ADD_MENTEE_SUCCESS';
export const ADD_MENTEE_FAILURE = 'ADD_MENTEE_FAILURE';

export const REMOVE_MENTEE_REQUEST = 'REMOVE_MENTEE_REQUEST';
export const REMOVE_MENTEE_SUCCESS = 'REMOVE_MENTEE_SUCCESS';
export const REMOVE_MENTEE_FAILURE = 'REMOVE_MENTEE_FAILURE';

export const FETCH_USER_MENTEES_REQUEST = 'FETCH_USER_MENTEES_REQUEST';
export const FETCH_USER_MENTEES_SUCCESS = 'FETCH_USER_MENTEES_SUCCESS';
export const FETCH_USER_MENTEES_FAILURE = 'FETCH_USER_MENTEES_FAILURE';

export const SEARCH_USER_MENTEES_REQUEST = 'SEARCH_USER_MENTEES_REQUEST';
export const SEARCH_USER_MENTEES_SUCCESS = 'SEARCH_USER_MENTEES_SUCCESS';
export const SEARCH_USER_MENTEES_FAILURE = 'SEARCH_USER_MENTEES_FAILURE';

export function addMentee (body) {
  return createApiAction({
    endpoint: '/api/mentees',
    body,
    method: 'POST',
    types: [ADD_MENTEE_REQUEST, ADD_MENTEE_SUCCESS, ADD_MENTEE_FAILURE]
  });
}

export function removeMentee (userId, studentId) {
  return createApiAction({
    endpoint: '/api/mentees/' + (+userId) + '/' + (+studentId),
    method: 'DELETE',
    types: [REMOVE_MENTEE_REQUEST, REMOVE_MENTEE_SUCCESS, REMOVE_MENTEE_FAILURE]
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
