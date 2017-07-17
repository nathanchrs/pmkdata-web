import { createApiAction } from '../api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function register(nim, email, username, password) {
  return (dispatch, getState) => {
    if (getState().session.user) {
      return Promise.resolve();
    }

    return dispatch(createApiAction({
      endpoint: '/api/users',
      method: 'POST',
      body: { nim, email, username, password },
      types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE]
    }));
  };
}

