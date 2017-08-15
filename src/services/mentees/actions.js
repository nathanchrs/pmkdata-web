import { createApiAction } from '../api';
import { createPaginatedApiResponse } from '../../common/components/Pagination/actions';

export const CREATE_MENTEE_REQUEST = 'CREATE_MENTEE_REQUEST';
export const CREATE_MENTEE_SUCCESS = 'CREATE_MENTEE_SUCCESS';
export const CREATE_MENTEE_FAILURE = 'CREATE_MENTEE_FAILURE';

export const FETCH_MENTEES_REQUEST = 'FETCH_MENTEES_REQUEST';
export const FETCH_MENTEES_SUCCESS = 'FETCH_MENTEES_SUCCESS';
export const FETCH_MENTEES_FAILURE = 'FETCH_MENTEES_FAILURE';

export const UPDATE_MENTEE_REQUEST = 'UPDATE_MENTEE_REQUEST';
export const UPDATE_MENTEE_SUCCESS = 'UPDATE_MENTEE_SUCCESS';
export const UPDATE_MENTEE_FAILURE = 'UPDATE_MENTEE_FAILURE';

export const DELETE_MENTEE_REQUEST = 'DELETE_MENTEE_REQUEST';
export const DELETE_MENTEE_SUCCESS = 'DELETE_MENTEE_SUCCESS';
export const DELETE_MENTEE_FAILURE = 'DELETE_MENTEE_FAILURE';

export function createMentor (body) {
  return (dispatch) => (
    dispatch(createApiAction({
      endpoint: '/api/mentees',
      method: 'POST',
      body,
      types: [CREATE_MENTEE_REQUEST, CREATE_MENTEE_SUCCESS, CREATE_MENTEE_FAILURE]
    })
  ));
}

export function fetchMentors ({ page, perPage, search, sort, filters } = {}) {
  return createApiAction({
    endpoint: '/api/mentees',
    method: 'GET',
    query: { page, perPage, search, sort, ...filters },
    types: [FETCH_MENTEES_REQUEST, createPaginatedApiResponse(FETCH_MENTEES_SUCCESS, 'mentees', { search, sort, filters }), FETCH_MENTEES_FAILURE]
  });
}

export function updateMentor (id, body) {
  return createApiAction({
    endpoint: '/api/mentees/' + id,
    method: 'PATCH',
    body,
    types: [UPDATE_MENTEE_REQUEST, { type: UPDATE_MENTEE_SUCCESS, meta: { updateKey: id, updateBody: body } }, UPDATE_MENTEE_FAILURE]
  });
}

export function deleteMentor (id) {
  return createApiAction({
    endpoint: '/api/mentees/' + id,
    method: 'DELETE',
    types: [DELETE_MENTEE_REQUEST, { type: DELETE_MENTEE_SUCCESS, meta: { deleteKey: id } }, DELETE_MENTEE_FAILURE]
  });
}
