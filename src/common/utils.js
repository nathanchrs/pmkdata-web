
export function getSortQuery (sortArray) {
  if (!sortArray) return undefined;
  let sortQuery = '';
  for (let i = 0; i < sortArray.length; i++) {
    sortQuery = sortQuery + (sortArray[0].direction === 'ascending' ? '' : '-') + sortArray[0].field;
  }
  return sortQuery;
}

export function getFirstSortDirection (sortArray, field) {
  if (!sortArray || sortArray.length <= 0 || !sortArray[0] || sortArray[0].field !== field) return null;
  return sortArray[0].direction;
}
