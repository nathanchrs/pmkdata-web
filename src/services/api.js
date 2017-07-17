import { CALL_API } from '@aftonbladet/redux-api-middleware';
import { ajv, ValidationError } from '../common/validation';

export function createApiAction(options) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    schema: {},
    credentials: 'include'
  };
  let apiAction = Object.assign({}, defaultOptions, options);

  if (apiAction.body !== undefined) {
    let isValid = ajv.validate(apiAction.schema, apiAction.body);
    if (!isValid) {
      return {
        type: apiAction.types[2],
        payload: new ValidationError(ajv.errors),
        error: true
      };
    }
    apiAction.body = JSON.stringify(apiAction.body);
  }

  delete apiAction.schema;
  return {
    [CALL_API]: apiAction
  };
}
