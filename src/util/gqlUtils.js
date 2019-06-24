import { _get } from './lodashUtils'

export const getDataFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}.data.${endpointName}`)

export const getIdFromGqlObject = gqlObject => _get(gqlObject, 'id')
