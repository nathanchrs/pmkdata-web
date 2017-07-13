import { HttpError } from '../../utils/fetchApi';
import { apiLogin, apiLogout } from './api';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export function login(username, password) {
  return async (dispatch, getState) => {
    if (getState().session.isFetching || getState().session.user) {
      return Promise.resolve();
    }

    dispatch({ type: LOGIN_START });
    let user;
    try {
      user = await apiLogin(username, password);
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        return dispatch({ type: LOGIN_FAILURE })
      } else {
        return dispatch({ type: LOGIN_ERROR, error });
      }
    }
    return dispatch({ type: LOGIN_SUCCESS, user });
  };
}

export function logout() {
  return async (dispatch, getState) => {
    if (getState().session.isFetching || !getState().session.user) {
      return Promise.resolve();
    }

    dispatch({ type: LOGOUT_START });
    try {
      await apiLogout();
    } catch (error) {
      return dispatch({ type: LOGOUT_ERROR, error });
    }
    return dispatch({ type: LOGOUT_SUCCESS });
  };
}
