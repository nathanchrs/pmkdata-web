import { fetchApi } from '../../utils/fetchApi';

export async function apiLogin(username, password) {
  let user = await fetchApi('/api/session', 'POST', { username, password });
  if (!user || !user.username) throw new Error('Login failed - invalid data received.');
  return user;
}

export async function apiLogout() {
  await fetch('/api/session', { method: 'DELETE' });
}
