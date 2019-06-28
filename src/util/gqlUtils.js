import React from 'react'
import { _get } from './lodashUtils'

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
