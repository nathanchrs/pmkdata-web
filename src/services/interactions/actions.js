import { createApiAction } from '../api';
import { createPaginatedApiResponse } from '../../common/components/Pagination/actions';
import { getSortQuery } from '../../common/utils';

export const FETCH_INTERACTIONS_REQUEST = 'FETCH_INTERACTIONS_REQUEST';
export const FETCH_INTERACTIONS_SUCCESS = 'FETCH_INTERACTIONS_SUCCESS';
export const FETCH_INTERACTIONS_FAILURE = 'FETCH_INTERACTIONS_FAILURE';

export const CREATE_INTERACTION_REQUEST = 'CREATE_INTERACTION_REQUEST';
export const CREATE_INTERACTION_SUCCESS = 'CREATE_INTERACTION_SUCCESS';
export const CREATE_INTERACTION_FAILURE = 'CREATE_INTERACTION_FAILURE';

export const UPDATE_INTERACTION_REQUEST = 'UPDATE_INTERACTION_REQUEST';
export const UPDATE_INTERACTION_SUCCESS = 'UPDATE_INTERACTION_SUCCESS';
export const UPDATE_INTERACTION_FAILURE = 'UPDATE_INTERACTION_FAILURE';

export const DELETE_INTERACTION_REQUEST = 'DELETE_INTERACTION_REQUEST';
export const DELETE_INTERACTION_SUCCESS = 'DELETE_INTERACTION_SUCCESS';
export const DELETE_INTERACTION_FAILURE = 'DELETE_INTERACTION_FAILURE';

export const FETCH_INTERACTION_MENTORS_REQUEST = 'FETCH_INTERACTION_MENTORS_REQUEST';
export const FETCH_INTERACTION_MENTORS_SUCCESS = 'FETCH_INTERACTION_MENTORS_SUCCESS';
export const FETCH_INTERACTION_MENTORS_FAILURE = 'FETCH_INTERACTION_MENTORS_FAILURE';

export const FETCH_INTERACTION_PARTICIPANTS_REQUEST = 'FETCH_INTERACTION_PARTICIPANTS_REQUEST';
export const FETCH_INTERACTION_PARTICIPANTS_SUCCESS = 'FETCH_INTERACTION_PARTICIPANTS_SUCCESS';
export const FETCH_INTERACTION_PARTICIPANTS_FAILURE = 'FETCH_INTERACTION_PARTICIPANTS_FAILURE';

export const ADD_INTERACTION_MENTOR_REQUEST = 'ADD_INTERACTION_MENTOR_REQUEST';
export const ADD_INTERACTION_MENTOR_SUCCESS = 'ADD_INTERACTION_MENTOR_SUCCESS';
export const ADD_INTERACTION_MENTOR_FAILURE = 'ADD_INTERACTION_MENTOR_FAILURE';

export const ADD_INTERACTION_PARTICIPANT_REQUEST = 'ADD_INTERACTION_PARTICIPANT_REQUEST';
export const ADD_INTERACTION_PARTICIPANT_SUCCESS = 'ADD_INTERACTION_PARTICIPANT_SUCCESS';
export const ADD_INTERACTION_PARTICIPANT_FAILURE = 'ADD_INTERACTION_PARTICIPANT_FAILURE';

export const REMOVE_INTERACTION_MENTOR_REQUEST = 'REMOVE_INTERACTION_MENTOR_REQUEST';
export const REMOVE_INTERACTION_MENTOR_SUCCESS = 'REMOVE_INTERACTION_MENTOR_SUCCESS';
export const REMOVE_INTERACTION_MENTOR_FAILURE = 'REMOVE_INTERACTION_MENTOR_FAILURE';

export const REMOVE_INTERACTION_PARTICIPANT_REQUEST = 'REMOVE_INTERACTION_PARTICIPANT_REQUEST';
export const REMOVE_INTERACTION_PARTICIPANT_SUCCESS = 'REMOVE_INTERACTION_PARTICIPANT_SUCCESS';
export const REMOVE_INTERACTION_PARTICIPANT_FAILURE = 'REMOVE_INTERACTION_PARTICIPANT_FAILURE';

export function fetchInteractions ({page, perPage, search, sort, filters} = {}) {
  return createApiAction({
    endpoint: '/api/interactions',
    method: 'GET',
    query: {page, perPage, search, sort: getSortQuery(sort), ...filters},
    types: [FETCH_INTERACTIONS_REQUEST, createPaginatedApiResponse(FETCH_INTERACTIONS_SUCCESS, 'interactions'), FETCH_INTERACTIONS_FAILURE]
  });
}

export function createInteraction (body) {
  return createApiAction({
    endpoint: '/api/interactions',
    method: 'POST',
    body,
    types: [CREATE_INTERACTION_REQUEST, CREATE_INTERACTION_SUCCESS, CREATE_INTERACTION_FAILURE]
  });
}

export function updateInteraction (id, body) {
  return createApiAction({
    endpoint: '/api/interactions/' + id,
    method: 'PATCH',
    body,
    types: [UPDATE_INTERACTION_REQUEST, {
      type: UPDATE_INTERACTION_SUCCESS,
      meta: {updateKey: id, updateBody: body}
    }, UPDATE_INTERACTION_FAILURE]
  });
}

export function deleteInteraction (id, body) {
  return createApiAction({
    endpoint: '/api/interactions/' + id,
    method: 'DELETE',
    types: [DELETE_INTERACTION_REQUEST, {type: DELETE_INTERACTION_SUCCESS, meta: {deleteKey: id}}, DELETE_INTERACTION_FAILURE]
  });
}

export function fetchInteractionMentors (interactionId) {
  return createApiAction({
    endpoint: '/api/interactions/' + (+interactionId) + '/mentors',
    method: 'GET',
    types: [FETCH_INTERACTION_MENTORS_REQUEST, FETCH_INTERACTION_MENTORS_SUCCESS, FETCH_INTERACTION_MENTORS_FAILURE]
  });
}

export function fetchInteractionParticipants (interactionId) {
  return createApiAction({
    endpoint: '/api/interactions/' + (+interactionId) + '/participants',
    method: 'GET',
    types: [FETCH_INTERACTION_PARTICIPANTS_REQUEST, FETCH_INTERACTION_PARTICIPANTS_SUCCESS, FETCH_INTERACTION_PARTICIPANTS_FAILURE]
  });
}

export function addInteractionMentor (interactionId, userId) {
  return createApiAction({
    endpoint: '/api/interactions/' + (+interactionId) + '/mentors',
    body: {user_id: +userId},
    method: 'POST',
    types: [ADD_INTERACTION_MENTOR_REQUEST, ADD_INTERACTION_MENTOR_SUCCESS, ADD_INTERACTION_MENTOR_FAILURE]
  });
}

export function addInteractionParticipant (interactionId, studentId) {
  return createApiAction({
    endpoint: '/api/interactions/' + (+interactionId) + '/participants',
    body: {student_id: +studentId},
    method: 'POST',
    types: [ADD_INTERACTION_PARTICIPANT_REQUEST, ADD_INTERACTION_MENTOR_SUCCESS, ADD_INTERACTION_PARTICIPANT_FAILURE]
  });
}

export function removeInteractionMentor (interactionId, userId) {
  return createApiAction({
    endpoint: '/api/interactions/' + (+interactionId) + '/mentors/' + (+userId),
    method: 'DELETE',
    types: [REMOVE_INTERACTION_MENTOR_REQUEST, REMOVE_INTERACTION_MENTOR_SUCCESS, REMOVE_INTERACTION_MENTOR_FAILURE]
  });
}

export function removeInteractionParticipant (interactionId, studentId) {
  return createApiAction({
    endpoint: '/api/interactions/' + (+interactionId) + '/participants/' + (+studentId),
    method: 'DELETE',
    types: [REMOVE_INTERACTION_PARTICIPANT_REQUEST, REMOVE_INTERACTION_PARTICIPANT_SUCCESS, REMOVE_INTERACTION_PARTICIPANT_FAILURE]
  });
}
