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
import React, { Component } from 'react'
import {
  getDataFromReactAdoptProps,
  getRefetchFromReactAdoptProps,
  getMutationFromReactAdoptProps,
  GqlEndpointsHelper,
  getHandleBackendCall,
} from '../../util/gqlUtils'
import { adopt } from 'react-adopt'
import {
  GET_PROJECTS_ENDPOINT_NAME,
  GET_PROJECTS_QUERY,
  DELETE_PROJECT_ENDPOINT_NAME,
  DELETE_PROJECT_MUTATION,
  DUPLICATE_PROJECT_ENDPOINT_NAME,
  DUPLICATE_PROJECT_MUTATION,
} from './queries'
import { Query, Mutation } from 'react-apollo'
import { redirect } from '../../util/redirectUtils'
import {
  PROJECT_DASHBOARD_PAGE_URL_PREFIX,
  getUrlWithId,
} from '../../strings/urlStrings'
import { AllProjectsPageView } from './view'

const Composed = adopt({
  [GET_PROJECTS_ENDPOINT_NAME]: ({ render }) => (
    <Query query={GET_PROJECTS_QUERY}>{render}</Query>
  ),
  [DELETE_PROJECT_ENDPOINT_NAME]: ({ render }) => (
    <Mutation mutation={DELETE_PROJECT_MUTATION}>{render}</Mutation>
  ),
  [DUPLICATE_PROJECT_ENDPOINT_NAME]: ({ render }) => (
    <Mutation mutation={DUPLICATE_PROJECT_MUTATION}>{render}</Mutation>
  ),
})

class AllProjectsPage extends Component {
  state = {
    projectDashboardIdForModal: null,
    projectDashboardModalIsVisible: false,
    createProjectModalIsVisible: false,
  }

  showProjectDashboardModal = () =>
    this.setState({ projectDashboardModalIsVisible: true })

  hideProjectDashboardModal = () =>
    this.setState({ projectDashboardModalIsVisible: false })

  handleProjectNameClick = projectId => {
    redirect({
      url: getUrlWithId({
        prefix: PROJECT_DASHBOARD_PAGE_URL_PREFIX,
        id: projectId,
      }),
    })
  }

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
            }) || []

          const refetchProjects = getRefetchFromReactAdoptProps({
            props,
            endpointName: GET_PROJECTS_ENDPOINT_NAME,
          })

          const gqlEndpointsHelper = new GqlEndpointsHelper(props)

          const duplicateProject = gqlEndpointsHelper.get(
            DUPLICATE_PROJECT_ENDPOINT_NAME,
          )

          const handleDuplicateProject = getHandleBackendCall({
            backendCall: async args =>
              await duplicateProject({
                variables: {
                  id: args.projectId,
                },
              }),
            refetch: refetchProjects,
          })

          const handleDeleteProject = getHandleBackendCall({
            backendCall: async args =>
              await getMutationFromReactAdoptProps({
                props,
                endpointName: DELETE_PROJECT_ENDPOINT_NAME,
              })({
                variables: {
                  id: args.projectId,
                },
              }),
            refetch: refetchProjects,
          })

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
              handleProjectNameClick={this.handleProjectNameClick}
            />
          )
        }}
      </Composed>
    )
  }
}

export default AllProjectsPage
