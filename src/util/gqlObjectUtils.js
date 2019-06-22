import { _get } from './lodashUtils'

export const GQL_OBJECT_ID_FIELD_NAME = 'id'
export const GQL_OBJECT_DATE_CREATED_FIELD_NAME = 'dateCreated'
export const getIdFromGqlObject = gqlObject =>
  _get(gqlObject, GQL_OBJECT_ID_FIELD_NAME)
