/*
 *  Copyright 2019 Laguro, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { _get, _isBoolean, _mapValues, _keyBy } from './lodashUtils';
import { execute } from './networkUtils';
import { Mutation } from 'react-apollo';

export const getDataFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}.data.${endpointName}`);

export const getIdFromGqlObject = gqlObject => _get(gqlObject, 'id');

export const getIsLoadingFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}.loading`);

export const getHasErrorFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}.error`);

export const getRefetchFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}.refetch`);

export const getMutationFromReactAdoptProps = ({ props, endpointName }) =>
  _get(props, `${endpointName}`);

// export const getDataFromReactAdoptProps = ({ props, endpointName }) =>
//   _get(props, `${endpointName}.data.${endpointName}`)

export const getComponentToRender = ({
  props,
  componentOnLoading = <div>Loading...</div>,
  componentOnError = <div>Please try again</div>,
  componentOnSuccess,
}) => {
  if (getIsLoadingFromReactAdoptProps(props)) {
    return componentOnLoading;
  } else if (getHasErrorFromReactAdoptProps(props)) {
    return componentOnError;
  } else {
    return componentOnSuccess;
  }
};

export class GqlEndpointsHelper {
  constructor(gqlProps) {
    this.props = gqlProps;
  }

  get = endpointName => _get(this.props, `${endpointName}`)
  getData = endpointName =>
    _get(this.props, `${endpointName}.data.${endpointName}`)

  getLoading = endpointName => {
    if (endpointName) {
      const loading = _get(this.props, `${endpointName}.loading`);
      if (_isBoolean(loading)) {
        return loading;
      } else {
        return _get(this.props, `${endpointName}.result.loading`);
      }
    } else {
      return Object.values(this.props)
        .map(endpointResult => _get(endpointResult, 'loading'))
        .filter(loading => _isBoolean(loading))
        .some(loading => loading);
    }
  }

  getComponentToRender = ({
    componentOnLoading = <div>Loading...</div>,
    componentOnError = <div>Please try again</div>,
    componentOnSuccess,
  }) => {
    if (this.getLoading()) {
      return componentOnLoading;
    } else if (getHasErrorFromReactAdoptProps(this.props)) {
      return componentOnError;
    } else {
      return componentOnSuccess;
    }
  }
  getRefetchFromReactAdoptProps = endpointName =>
    _get(this.props, `${endpointName}.refetch`)

  getMutation = endpointName => _get(this.props, `${endpointName}.mutation`)
}

export const getHandleBackendCall = ({
  backendCall,
  refetch = () => {},
  afterRefetch = () => {},
}) => async ({ values, onSuccess = () => {} } = {}) => {
  await execute({
    action: async () => {
      await backendCall(values); // the backend call called with values from form or other child component
      onSuccess(); // used to display messages
      await refetch(); // e.g. refetch projects after creating new project
      await afterRefetch(); // e.g. hide form modal
    },
  });
};

export const getReactAdoptArgForMutations = mutationEndpoints =>
  _mapValues(
    _keyBy(
      mutationEndpoints.map(endpoint => ({
        endpointName: endpoint.name,
        renderProp: ({ render }) => (
          <Mutation mutation={endpoint.mutation}>
            {(mutation, result) => render({ mutation, result })}
          </Mutation>
        ),
      })),
      'endpointName',
    ),
    'renderProp',
  );
