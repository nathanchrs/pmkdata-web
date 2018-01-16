import { RSAA } from 'redux-api-middleware';
import qs from 'qs';
import { apiEndpointPrefix, sortDirections } from '../common/constants';

/**
 * Converts an array of sort data indices and directions to query string form.
 * @param {array} sortArray Lists sort directions { dataIndex, direction } in order.
 * Direction can be 'ascending' or 'descending' (defaults to 'ascending').
 */
function sortArrayToQueryString(sortArray) {
  if (!sortArray) return '';
  let sortParts = [];
  for (let i = 0; i < sortArray.length; i++) {
    sortParts.push((sortArray[i].direction === sortDirections.descending.value ? '-' : '') + sortArray[i].dataIndex);
  }
  return sortParts.join(',');
}

export function createApiAction(options) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };
  let apiAction = Object.assign({}, defaultOptions, options);

  if (apiAction.body !== undefined) {
    apiAction.body = JSON.stringify(apiAction.body);
  }

  apiAction.endpoint = apiEndpointPrefix + apiAction.endpoint;

  if (apiAction.query !== null && typeof apiAction.query === 'object') {
    for (let key in apiAction.query) {
      if (apiAction.query[key] === {} || apiAction.query[key] === '') delete apiAction.query[key];
    }
    apiAction.endpoint = [
      apiAction.endpoint.replace(/\?*/, ''),
      qs.stringify(apiAction.query)
    ].join('?');
  }
  if (apiAction.query !== undefined) delete apiAction.query;

  return {
    [RSAA]: apiAction
  };
}

export function apiCreate(endpoint, body, types) {
  return createApiAction({
    endpoint,
    method: 'POST',
    body,
    types
  });
}

export function apiFetch(endpoint, { page, perPage, search, sort, filters } = {}, types) {
  return createApiAction({
    endpoint,
    method: 'GET',
    query: { page, perPage, search, sort: sortArrayToQueryString(sort), ...filters },
    types
  });
}

export function apiUpdate(endpoint, body, types) {
  return createApiAction({
    endpoint,
    method: 'PATCH',
    body,
    types
  });
}

export function apiDelete(endpoint, types) {
  return createApiAction({
    endpoint,
    method: 'DELETE',
    types
  });
}
