import { createApiAction } from '../api';

export const ADD_MENTEE_REQUEST = 'ADD_MENTEE_REQUEST';
export const ADD_MENTEE_SUCCESS = 'ADD_MENTEE_SUCCESS';
export const ADD_MENTEE_FAILURE = 'ADD_MENTEE_FAILURE';

export const REMOVE_MENTEE_REQUEST = 'REMOVE_MENTEE_REQUEST';
export const REMOVE_MENTEE_SUCCESS = 'REMOVE_MENTEE_SUCCESS';
export const REMOVE_MENTEE_FAILURE = 'REMOVE_MENTEE_FAILURE';

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
