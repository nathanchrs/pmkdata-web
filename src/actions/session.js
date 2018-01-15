import { apiCreate, apiDelete } from './api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const RESET_REDUX_STATE = 'RESET_REDUX_STATE';

export function resetReduxState() {
  return {
    type: RESET_REDUX_STATE
  }
}

export function login(body) {
  return apiCreate('/session', body, [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]);
}

export function logout() {
  return async (dispatch, getState) => {
    await apiDelete('/session', [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE]);
    return dispatch(resetReduxState());
  }
}
