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
import React, { Component } from 'react';
import {
  getDataFromReactAdoptProps,
  getRefetchFromReactAdoptProps,
  GqlEndpointsHelper,
  getHandleBackendCall,
  getReactAdoptArgForMutations,
} from '../../util/gqlUtils';
import { adopt } from 'react-adopt';
import {
  GET_PROJECTS_ENDPOINT_NAME,
  GET_PROJECTS_QUERY,
  STOP_PROJECT_ENDPOINT_NAME,
  STOP_PROJECT_MUTATION,
  DUPLICATE_PROJECT_ENDPOINT_NAME,
  DUPLICATE_PROJECT_MUTATION,
} from './queries';
import { Query } from 'react-apollo';
import { AllProjectsPageView } from './view';

const Composed = adopt({
  [GET_PROJECTS_ENDPOINT_NAME]: ({ render }) => (
    <Query query={GET_PROJECTS_QUERY}>{render}</Query>
  ),
  ...getReactAdoptArgForMutations([
    {
      name: DUPLICATE_PROJECT_ENDPOINT_NAME,
      mutation: DUPLICATE_PROJECT_MUTATION,
    },
    {
      name: STOP_PROJECT_ENDPOINT_NAME,
      mutation: STOP_PROJECT_MUTATION,
    },
  ]),
});

class AllProjectsPage extends Component {
  state = {
    projectDashboardIdForModal: null,
    projectDashboardModalIsVisible: false,
    createProjectModalIsVisible: false,
    projectIdForDuplicateProject: null,
  }

  showProjectDashboardModal = () =>
    this.setState({ projectDashboardModalIsVisible: true })

  hideProjectDashboardModal = () =>
    this.setState({ projectDashboardModalIsVisible: false })

  showCreateProjectModal = () =>
    this.setState({ createProjectModalIsVisible: true })

  hideCreateProjectModal = () =>
    this.setState({ createProjectModalIsVisible: false })

  render() {
    return (
      <Composed>
        {props => {
          const projects =
            getDataFromReactAdoptProps({
              props,
              endpointName: GET_PROJECTS_ENDPOINT_NAME,
            }) || [];

          const refetchProjects = getRefetchFromReactAdoptProps({
            props,
            endpointName: GET_PROJECTS_ENDPOINT_NAME,
          });

          const gqlEndpointsHelper = new GqlEndpointsHelper(props);

          const duplicateProject = gqlEndpointsHelper.getMutation(
            DUPLICATE_PROJECT_ENDPOINT_NAME,
          );

          const handleDuplicateProject = getHandleBackendCall({
            backendCall: async args => {
              await this.setState({
                projectIdForDuplicateProject: args.projectId,
              });
              await duplicateProject({
                variables: {
                  id: args.projectId,
                },
              });
            },
            refetch: refetchProjects,
          });

          const deleteProject = gqlEndpointsHelper.getMutation(
            STOP_PROJECT_ENDPOINT_NAME,
          );

          const handleDeleteProject = getHandleBackendCall({
            backendCall: async args =>
              deleteProject({
                variables: {
                  id: args.projectId,
                },
              }),
            refetch: refetchProjects,
          });

          return (
            <AllProjectsPageView
              projects={projects}
              refetchProjects={refetchProjects}
              handleDeleteProject={handleDeleteProject}
              handleDuplicateProject={handleDuplicateProject}
              createProjectModalIsVisible={
                this.state.createProjectModalIsVisible
              }
              hideCreateProjectModal={this.hideCreateProjectModal}
              showCreateProjectModal={this.showCreateProjectModal}
              getDuplicateProjectIsLoading={projectId =>
                this.state.projectIdForDuplicateProject === projectId &&
                gqlEndpointsHelper.getLoading(DUPLICATE_PROJECT_ENDPOINT_NAME)
              }
            />
          );
        }}
      </Composed>
    );
  }
}

export default AllProjectsPage;
