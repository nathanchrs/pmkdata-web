import { CALL_API } from '@aftonbladet/redux-api-middleware';;

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

  return {
    [CALL_API]: apiAction
  };
}
