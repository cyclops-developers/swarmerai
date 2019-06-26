import React from 'react'
import { _get } from './lodashUtils'

import { execute } from './networkUtils'

export const getDataFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}.data.${endpointName}`)

export const getIdFromGqlObject = gqlObject => _get(gqlObject, 'id')

export const getIsLoadingFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}.loading`)

export const getHasErrorFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}.error`)

export const getRefetchFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}.refetch`)

export const getMutationFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}`)

// export const getDataFromReactAdoptProps = ({ props, endpointName }) =>
//   _get(props, `${endpointName}.data.${endpointName}`)

export const getComponentToRender = ({
  props,
  componentOnLoading = <div>Loading...</div>,
  componentOnError = <div>Please try again</div>,
  componentOnSuccess,
}) => {
  if (getIsLoadingFromReactAdoptProps(props)) {
    return componentOnLoading
  } else if (getHasErrorFromReactAdoptProps(props)) {
    return componentOnError
  } else {
    return componentOnSuccess
  }
}

export class GqlEndpointsHelper {
  constructor(gqlProps) {
    this.props = gqlProps
  }

  get = endpointName => _get(this.props, `${endpointName}`)
}

export const getHandleBackendCall = ({
  backendCall,
  refetch = () => {},
  afterRefetch = () => {},
}) => async ({ values, onSuccess = () => {} }) => {
  await execute({
    action: async () => {
      await backendCall(values) // the backend call called with values from form or other child component
      await refetch() // e.g. refetch projects after creating new project
      onSuccess() // used to display messages
      await afterRefetch() // e.g. hide form modal
    },
  })
}
