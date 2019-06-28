import { _get, _find } from './lodashUtils'

export const GQL_OBJECT_ID_FIELD_NAME = 'id'
export const GQL_OBJECT_DATE_CREATED_FIELD_NAME = 'createdAt'
export const getIdFromGqlObject = gqlObject =>
  _get(gqlObject, GQL_OBJECT_ID_FIELD_NAME)
export const getObjectWithIdFromArray = (array, id) =>
  _find(array, [GQL_OBJECT_ID_FIELD_NAME, id])
