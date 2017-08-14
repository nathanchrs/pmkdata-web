import { createApiAction } from '../api';
import { createPaginatedApiResponse } from '../../common/components/Pagination/actions';

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';

export function fetchEvents({ page, perPage, search, sort, filters } = {}) {
  return createApiAction({
    endpoint: '/api/events',
    method: 'GET',
    query: { page, perPage, search, sort, ...filters },
    types: [FETCH_EVENTS_REQUEST, createPaginatedApiResponse(FETCH_EVENTS_SUCCESS, 'events'), FETCH_EVENTS_FAILURE]
  });
}

export function updateEvent(id, body) {
  return createApiAction({
    endpoint: '/api/events/' + id,
    method: 'PATCH',
    body,
    types: [
      UPDATE_EVENT_REQUEST,
      { type: UPDATE_EVENT_SUCCESS, meta: { updateKey: id, updateBody: body } },
      UPDATE_EVENT_FAILURE
    ]
  });
}
