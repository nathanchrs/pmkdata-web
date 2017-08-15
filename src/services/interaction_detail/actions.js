import { createApiAction } from '../api';

export const CREATE_INTERACTION_DETAIL_REQUEST = 'CREATE_INTERACTION_DETAIL_REQUEST';
export const CREATE_INTERACTION_DETAIL_SUCCESS = 'CREATE_INTERACTION_DETAIL_SUCCESS';
export const CREATE_INTERACTION_DETAIL_FAILURE = 'CREATE_INTERACTION_DETAIL_FAILURE';

export const FETCH_INTERACTION_DETAIL_REQUEST = 'FETCH_INTERACTION_DETAIL_REQUEST';
export const FETCH_INTERACTION_DETAIL_SUCCESS = 'FETCH_INTERACTION_DETAIL_SUCCESS';
export const FETCH_INTERACTION_DETAIL_FAILURE = 'FETCH_INTERACTION_DETAIL_FAILURE';

export const UPDATE_INTERACTION_DETAIL_REQUEST = 'UPDATE_INTERACTION_DETAIL_REQUEST';
export const UPDATE_INTERACTION_DETAIL_SUCCESS = 'UPDATE_INTERACTION_DETAIL_SUCCESS';
export const UPDATE_INTERACTION_DETAIL_FAILURE = 'UPDATE_INTERACTION_DETAIL_FAILURE';

export const DELETE_INTERACTION_DETAIL_REQUEST = 'DELETE_INTERACTION_DETAIL_REQUEST';
export const DELETE_INTERACTION_DETAIL_SUCCESS = 'DELETE_INTERACTION_DETAIL_SUCCESS';
export const DELETE_INTERACTION_DETAIL_FAILURE = 'DELETE_INTERACTION_DETAIL_FAILURE';

export function createInteractionDetail (body) {
  return (dispatch, getState) => (
    dispatch(createApiAction({
      endpoint: '/api/interaction_participants',
      method: 'POST',
      body,
      types: [CREATE_INTERACTION_DETAIL_REQUEST, CREATE_INTERACTION_DETAIL_SUCCESS, CREATE_INTERACTION_DETAIL_FAILURE]
    })
  ));
}

export function fetchInteractionDetail (id, username) {
  let endpoint = '/api/interaction_participants/interaction/' + id;
  if (username) endpoint = endpoint + '/' + username;
  return createApiAction({
    endpoint,
    method: 'GET',
    types: [FETCH_INTERACTION_DETAIL_REQUEST, FETCH_INTERACTION_DETAIL_SUCCESS, FETCH_INTERACTION_DETAIL_FAILURE]
  });
}

export function updateInteractionDetail (id, body) {
  return createApiAction({
    endpoint: '/api/interaction_participants/' + id,
    method: 'PATCH',
    body,
    types: [UPDATE_INTERACTION_DETAIL_REQUEST, { type: UPDATE_INTERACTION_DETAIL_SUCCESS, meta: { updateKey: id, updateBody: body } }, UPDATE_INTERACTION_DETAIL_FAILURE]
  });
}

export function deleteInteractionDetail (id, interactionId) {
  return (dispatch, getState) => {
    dispatch(createApiAction({
      endpoint: '/api/interaction_participants/' + id,
      method: 'DELETE',
      types: [DELETE_INTERACTION_DETAIL_REQUEST, { type: DELETE_INTERACTION_DETAIL_SUCCESS, meta: { deleteKey: id } }, DELETE_INTERACTION_DETAIL_FAILURE]
    }));
  };
}
