import { createApiAction } from '../api';
import { createPaginatedApiResponse } from '../../common/components/Pagination/actions';

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export function createEvent (body) {
  return (dispatch) => (
    dispatch(createApiAction({
      endpoint: '/api/events',
      method: 'POST',
      body,
      types: [CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE]
    })
  ));
}

export function fetchEvents ({ page, perPage, search, sort, filters } = {}) {
  return createApiAction({
    endpoint: '/api/events',
    method: 'GET',
    query: { page, perPage, search, sort, ...filters },
    types: [FETCH_EVENTS_REQUEST, createPaginatedApiResponse(FETCH_EVENTS_SUCCESS, 'events', { search, sort, filters }), FETCH_EVENTS_FAILURE]
  });
}

export function updateEvent (id, body) {
  return createApiAction({
    endpoint: '/api/events/' + id,
    method: 'PATCH',
    body,
    types: [UPDATE_EVENT_REQUEST, { type: UPDATE_EVENT_SUCCESS, meta: { updateKey: id, updateBody: body } }, UPDATE_EVENT_FAILURE]
  });
}

export function deleteEvent (id) {
  return createApiAction({
    endpoint: '/api/events/' + id,
    method: 'DELETE',
    types: [DELETE_EVENT_REQUEST, { type: DELETE_EVENT_SUCCESS, meta: { deleteKey: id } }, DELETE_EVENT_FAILURE]
  });
}
