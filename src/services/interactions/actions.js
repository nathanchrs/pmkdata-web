import { createApiAction } from '../api';
import { createPaginatedApiResponse } from '../../common/components/Pagination/actions';

export const CREATE_INTERACTION_REQUEST = 'CREATE_INTERACTION_REQUEST';
export const CREATE_INTERACTION_SUCCESS = 'CREATE_INTERACTION_SUCCESS';
export const CREATE_INTERACTION_FAILURE = 'CREATE_INTERACTION_FAILURE';

export const FETCH_INTERACTIONS_REQUEST = 'FETCH_INTERACTIONS_REQUEST';
export const FETCH_INTERACTIONS_SUCCESS = 'FETCH_INTERACTIONS_SUCCESS';
export const FETCH_INTERACTIONS_FAILURE = 'FETCH_INTERACTIONS_FAILURE';

export const UPDATE_INTERACTION_REQUEST = 'UPDATE_INTERACTION_REQUEST';
export const UPDATE_INTERACTION_SUCCESS = 'UPDATE_INTERACTION_SUCCESS';
export const UPDATE_INTERACTION_FAILURE = 'UPDATE_INTERACTION_FAILURE';

export const DELETE_INTERACTION_REQUEST = 'DELETE_INTERACTION_REQUEST';
export const DELETE_INTERACTION_SUCCESS = 'DELETE_INTERACTION_SUCCESS';
export const DELETE_INTERACTION_FAILURE = 'DELETE_INTERACTION_FAILURE';

export function createInteraction (body) {
  return (dispatch, getState) => (
    dispatch(createApiAction({
      endpoint: '/api/interactions',
      method: 'POST',
      body,
      types: [CREATE_INTERACTION_REQUEST, CREATE_INTERACTION_SUCCESS, CREATE_INTERACTION_FAILURE]
    })
  ));
}

export function fetchInteractions ({ page, perPage, search, sort, filters } = {}) {
  return createApiAction({
    endpoint: '/api/interactions',
    method: 'GET',
    query: { page, perPage, search, sort, ...filters },
    types: [FETCH_INTERACTIONS_REQUEST, createPaginatedApiResponse(FETCH_INTERACTIONS_SUCCESS, 'interactions'), FETCH_INTERACTIONS_FAILURE]
  });
}

export function updateInteraction (id, body) {
  return createApiAction({
    endpoint: '/api/interactions/' + id,
    method: 'PATCH',
    body,
    types: [UPDATE_INTERACTION_REQUEST, { type: UPDATE_INTERACTION_SUCCESS, meta: { updateKey: id, updateBody: body } }, UPDATE_INTERACTION_FAILURE]
  });
}

export function deleteInteraction (id) {
  return createApiAction({
    endpoint: '/api/interactions/' + id,
    method: 'DELETE',
    types: [DELETE_INTERACTION_REQUEST, { type: DELETE_INTERACTION_SUCCESS, meta: { deleteKey: id } }, DELETE_INTERACTION_FAILURE]
  });
}
