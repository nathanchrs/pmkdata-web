import { createApiAction } from '../api';
import { createPaginatedApiResponse } from '../../common/components/Pagination/actions';

export const CREATE_MENTOR_REQUEST = 'CREATE_MENTOR_REQUEST';
export const CREATE_MENTOR_SUCCESS = 'CREATE_MENTOR_SUCCESS';
export const CREATE_MENTOR_FAILURE = 'CREATE_MENTOR_FAILURE';

export const FETCH_MENTORS_REQUEST = 'FETCH_MENTORS_REQUEST';
export const FETCH_MENTORS_SUCCESS = 'FETCH_MENTORS_SUCCESS';
export const FETCH_MENTORS_FAILURE = 'FETCH_MENTORS_FAILURE';

export const UPDATE_MENTOR_REQUEST = 'UPDATE_MENTOR_REQUEST';
export const UPDATE_MENTOR_SUCCESS = 'UPDATE_MENTOR_SUCCESS';
export const UPDATE_MENTOR_FAILURE = 'UPDATE_MENTOR_FAILURE';

export const DELETE_MENTOR_REQUEST = 'DELETE_MENTOR_REQUEST';
export const DELETE_MENTOR_SUCCESS = 'DELETE_MENTOR_SUCCESS';
export const DELETE_MENTOR_FAILURE = 'DELETE_MENTOR_FAILURE';

export function createMentor (body) {
  return (dispatch) => (
    dispatch(createApiAction({
      endpoint: '/api/mentors',
      method: 'POST',
      body,
      types: [CREATE_MENTOR_REQUEST, CREATE_MENTOR_SUCCESS, CREATE_MENTOR_FAILURE]
    })
  ));
}

export function fetchMentors ({ page, perPage, search, sort, filters } = {}) {
  return createApiAction({
    endpoint: '/api/mentors',
    method: 'GET',
    query: { page, perPage, search, sort, ...filters },
    types: [FETCH_MENTORS_REQUEST, createPaginatedApiResponse(FETCH_MENTORS_SUCCESS, 'mentors'), FETCH_MENTORS_FAILURE]
  });
}

export function updateMentor (id, body) {
  return createApiAction({
    endpoint: '/api/mentors/' + id,
    method: 'PATCH',
    body,
    types: [UPDATE_MENTOR_REQUEST, { type: UPDATE_MENTOR_SUCCESS, meta: { updateKey: id, updateBody: body } }, UPDATE_MENTOR_FAILURE]
  });
}

export function deleteMentor (id) {
  return createApiAction({
    endpoint: '/api/mentors/' + id,
    method: 'DELETE',
    types: [DELETE_MENTOR_REQUEST, { type: DELETE_MENTOR_SUCCESS, meta: { deleteKey: id } }, DELETE_MENTOR_FAILURE]
  });
}
