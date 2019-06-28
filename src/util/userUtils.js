import { _get } from './lodashUtils'

export const USER_NAME_FIELD_NAME = 'name'
export const getUserName = user => _get(user, USER_NAME_FIELD_NAME)
