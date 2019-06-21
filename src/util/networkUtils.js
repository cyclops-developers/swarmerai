import _get from 'lodash/get'
import { message } from 'antd'

// returns executionHasNoError
export const execute = async ({
  action,
  onError = () => {},
  errorMessages = {}, //  errorMessages  provide mapping between backend error messages and frontend error messages
}) => {
  try {
    await action()
    return true
  } catch (error) {
    onError(error)

    const gqlError =
      _get(error, 'networkError.result.result.errors[0].message') ||
      _get(error, 'graphQLErrors[0].message') ||
      _get(error, 'message')

    if (errorMessages.hasOwnProperty(gqlError)) {
      message.error(errorMessages[gqlError])
      return false
    }

    message.error(gqlError)
    return false
  }
}
