import { CALL_API } from '@aftonbladet/redux-api-middleware';
import qs from 'qs';

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

  if (apiAction.query !== null && typeof apiAction.query === 'object') {
    apiAction.endpoint = [
      apiAction.endpoint.replace(/\?*/, ''),
      qs.stringify(apiAction.query),
    ].join('?');
  }
  if (apiAction.query !== undefined) delete apiAction.query;

  return {
    [CALL_API]: apiAction
  };
}
