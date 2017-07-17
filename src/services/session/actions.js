import { createApiAction } from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const CLEAR_SESSION = 'CLEAR_SESSION';

export function login(username, password) {
  return (dispatch, getState) => {
    if (getState().session.user) {
      return Promise.resolve();
    }

    return dispatch(createApiAction({
      endpoint: '/api/session',
      method: 'POST',
      body: { username, password },
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
    }));
  };
}

export function logout() {
  return (dispatch, getState) => {
    if (!getState().session.user) {
      return Promise.resolve();
    }
    return dispatch(createApiAction({
      endpoint: '/api/session',
      method: 'DELETE',
      types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE]
    }));
  };
}

export function clearSession() {
  return { type: CLEAR_SESSION };
}
