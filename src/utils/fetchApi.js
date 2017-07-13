import fetch from 'isomorphic-fetch';

export function HttpError(message, status) {
  this.name = 'HttpError';
  this.message = message || '';
  this.status = status || 500;
  this.stack = (new Error()).stack;
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

export async function fetchApi(url, method, body) {
  let response = await fetch('/api/session', {
    method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new HttpError('Login failed.', response.status);
  return response.json();
}