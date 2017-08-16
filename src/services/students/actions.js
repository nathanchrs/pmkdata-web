import { createApiAction } from '../api';
import { createPaginatedApiResponse } from '../../common/components/Pagination/actions';
import { getSortQuery } from '../../common/utils';

export const FETCH_STUDENTS_REQUEST = 'FETCH_STUDENTS_REQUEST';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';

export const CREATE_STUDENT_REQUEST = 'CREATE_STUDENT_REQUEST';
export const CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_SUCCESS';
export const CREATE_STUDENT_FAILURE = 'CREATE_STUDENT_FAILURE';

export const UPDATE_STUDENT_REQUEST = 'UPDATE_STUDENT_REQUEST';
export const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT_SUCCESS';
export const UPDATE_STUDENT_FAILURE = 'UPDATE_STUDENT_FAILURE';

export const DELETE_STUDENT_REQUEST = 'DELETE_STUDENT_REQUEST';
export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
export const DELETE_STUDENT_FAILURE = 'DELETE_STUDENT_FAILURE';

export function fetchStudents ({page, perPage, search, sort, filters} = {}) {
  return createApiAction({
    endpoint: '/api/students',
    method: 'GET',
    query: {page, perPage, search, sort: getSortQuery(sort), ...filters},
    types: [FETCH_STUDENTS_REQUEST, createPaginatedApiResponse(FETCH_STUDENTS_SUCCESS, 'students'), FETCH_STUDENTS_FAILURE]
  });
}

export function createStudent (body) {
  return createApiAction({
    endpoint: '/api/students',
    method: 'POST',
    body,
    types: [CREATE_STUDENT_REQUEST, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_FAILURE]
  });
}

export function updateStudent (id, body) {
  return createApiAction({
    endpoint: '/api/students/' + id,
    method: 'PATCH',
    body,
    types: [UPDATE_STUDENT_REQUEST, {
      type: UPDATE_STUDENT_SUCCESS,
      meta: {updateKey: id, updateBody: body}
    }, UPDATE_STUDENT_FAILURE]
  });
}

export function deleteStudent (id, body) {
  return createApiAction({
    endpoint: '/api/students/' + id,
    method: 'DELETE',
    types: [DELETE_STUDENT_REQUEST, {type: DELETE_STUDENT_SUCCESS, meta: {deleteKey: id}}, DELETE_STUDENT_FAILURE]
  });
}
