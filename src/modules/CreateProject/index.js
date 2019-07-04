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
import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { Mutation } from 'react-apollo';
import _get from 'lodash/get';
import { CREATE_PROJECT_ENDPOINT_NAME, createProjectMutation } from './queries';
import { getProjectForGqlCall } from '../../util/projectUtils';
import { Box } from '../../components/Box';
import { H3 } from '../../helperModules/Texts';
import ProjectForm from '../ProjectForm';
import { execute } from '../../util/networkUtils';

const Composed = adopt({
  [CREATE_PROJECT_ENDPOINT_NAME]: ({ render }) => (
    <Mutation mutation={createProjectMutation}>{render}</Mutation>
  ),
});

class CreateProject extends PureComponent {
  render() {
    return (
      <Composed>
        {props => {
          const handleSubmit = async ({ values, onSuccess, onError }) => {
            await execute({
              action: async () => {
                await _get(props, `${CREATE_PROJECT_ENDPOINT_NAME}`)({
                  variables: {
                    input: getProjectForGqlCall(values),
                  },
                });
                this.props.onSuccess();
                onSuccess();
              },
              onError,
            });
          };

          return (
            <Box>
              <H3>New project</H3>
              <ProjectForm data={{}} onSubmit={handleSubmit} />
            </Box>
          );
        }}
      </Composed>
    );
  }
}

export { CreateProject };
