
export const SET_PAGE = 'SET_PAGE';
export const SET_PER_PAGE = 'SET_PER_PAGE';
export const SET_LAST_PAGE = 'SET_LAST_PAGE';

export function setPage(storeKey, page) {
  return {
    type: SET_PAGE,
    payload: { storeKey, page }
  };
}

export function setPerPage(storeKey, perPage) {
  return {
    type: SET_PER_PAGE,
    payload: { storeKey, perPage }
  };
}

export function setLastPage(storeKey, lastPage) {
  return {
    type: SET_PER_PAGE,
    payload: { storeKey, lastPage }
  };
}
