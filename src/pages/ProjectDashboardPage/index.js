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
import { adopt } from 'react-adopt';
import {
  GET_PROJECT_ENDPOINT_NAME,
  GET_PROJECT_QUERY,
  UPDATE_PROJECT_MUTATION,
  UPDATE_PROJECT_ENDPOINT_NAME,
  START_PROJECT_ENDPOINT_NAME,
  START_PROJECT_MUTATION,
} from './queries';
import { Query, Mutation } from 'react-apollo';
import {
  getComponentToRender,
  getDataFromReactAdoptProps,
  getMutationFromReactAdoptProps,
  getRefetchFromReactAdoptProps,
  getHandleBackendCall,
  GqlEndpointsHelper,
} from '../../util/gqlUtils';
import {
  Project,
  getProjectForForm,
  getProjectForGqlCall,
} from '../../util/projectUtils';
import { ProjectDashboardPageView } from './view';
import moment from 'moment';
import { _find } from '../../util/lodashUtils';

const Composed = adopt({
  [GET_PROJECT_ENDPOINT_NAME]: ({ render, projectId }) => (
    <Query query={GET_PROJECT_QUERY} variables={{ id: projectId }}>
      {render}
    </Query>
  ),
  [UPDATE_PROJECT_ENDPOINT_NAME]: ({ render, projectId }) => (
    <Mutation mutation={UPDATE_PROJECT_MUTATION} variables={{ id: projectId }}>
      {render}
    </Mutation>
  ),
  [START_PROJECT_ENDPOINT_NAME]: ({ render, projectId }) => (
    <Mutation mutation={START_PROJECT_MUTATION} variables={{ id: projectId }}>
      {render}
    </Mutation>
  ),
});

class ProjectDashboardPage extends Component {
  state = {
    projectFormModalIsVisible: false,
    jobDetailsModalIsVisible: false,
    jobIdForJobDetailsModal: null,
  }

  showProjectFormModal = () =>
    this.setState({ projectFormModalIsVisible: true })

  hideProjectFormModal = () =>
    this.setState({ projectFormModalIsVisible: false })

  showJobDetailsModal = jobId =>
    this.setState({
      jobDetailsModalIsVisible: true,
      jobIdForJobDetailsModal: jobId,
    })

  hideJobDetailsModal = () =>
    this.setState({
      jobDetailsModalIsVisible: false,
      jobIdForJobDetailsModal: null,
    })

  handleJobDetailsModalCancel = this.hideJobDetailsModal

  render() {
    return (
      <Composed projectId={this.props.match.params.id}>
        {props => {
          const gqlProject =
            getDataFromReactAdoptProps({
              props,
              endpointName: GET_PROJECT_ENDPOINT_NAME,
            }) || {};

          const project = new Project(gqlProject);
          const projectForForm = getProjectForForm(gqlProject);

          const gqlEndpointsHelper = new GqlEndpointsHelper(props);

          const refetchProject = getRefetchFromReactAdoptProps({
            props,
            endpointName: GET_PROJECT_ENDPOINT_NAME,
          });
          const updateProject = getMutationFromReactAdoptProps({
            props,
            endpointName: UPDATE_PROJECT_ENDPOINT_NAME,
          });

          const handleSubmit = getHandleBackendCall({
            backendCall: async values =>
              await updateProject({
                variables: {
                  input: {
                    id: project.getId(),
                    ...getProjectForGqlCall(values),
                  },
                },
              }),
            refetch: refetchProject,
            afterRefetch: this.hideProjectFormModal,
          });

          const startProject = gqlEndpointsHelper.get(
            START_PROJECT_ENDPOINT_NAME,
          );

          const handleStartProject = getHandleBackendCall({
            backendCall: async values =>
              await startProject({
                variables: {
                  id: project.getId(),
                },
              }),
            refetch: refetchProject,
          });

          const jobs = [
            {
              id: 'jobId',
              project: {
                name: 'Project name',
                creator: {
                  name: 'project creator name',
                },
              },
              category: 'project category',
              startDateTime: moment().format(),
              status: 'ACTIVE',
              topContributors: ['a', 'b', 'c'],
            },
            {
              id: 'jobId',
              project: {
                name: 'Project name2',
                creator: {
                  name: 'project creator name2',
                },
              },
              category: 'project category2',
              startDateTime: moment()
                .subtract(1, 'day')
                .format(),
              status: 'STOPPED',
              topContributors: ['a', 'b', 'c'],
            },
          ];

          const componentOnSuccess = (
            <ProjectDashboardPageView
              project={project}
              handleSubmit={handleSubmit}
              handleModalCancel={this.hideProjectFormModal}
              projectForForm={projectForForm}
              handleEditClick={this.showProjectFormModal}
              projectFormModalIsVisible={this.state.projectFormModalIsVisible}
              showJobDetailsModal={this.showJobDetailsModal}
              jobDetailsModalIsVisible={this.state.jobDetailsModalIsVisible}
              handleJobDetailsModalCancel={this.handleJobDetailsModalCancel}
              jobs={jobs}
              jobForJobDetailsModal={
                _find(jobs, ['id', this.state.jobIdForJobDetailsModal]) || {}
              }
              handleStartProject={handleStartProject}
            />
          );

          return getComponentToRender({ props, componentOnSuccess });
        }}
      </Composed>
    );
  }
}

export default ProjectDashboardPage;
