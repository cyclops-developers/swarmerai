import React, { Component, Fragment } from 'react'
import { ProjectsTable } from '../../modules/ProjectsTable'
import ProjectDashboard from '../../modules/ProjectDashboard'
import { Modal, Button } from 'antd'
import { Flex } from '../../components/Flex'
import { CreateProject } from '../../modules/CreateProject'
import {
  getDataFromReactAdoptProps,
  getRefetchFromReactAdoptProps,
  getMutationFromReactAdoptProps,
} from '../../util/gqlUtils'
import { adopt } from 'react-adopt'
import {
  GET_PROJECTS_ENDPOINT_NAME,
  GET_PROJECTS_QUERY,
  DELETE_PROJECT_ENDPOINT_NAME,
  DELETE_PROJECT_MUTATION,
} from './queries'
import { Query, Mutation } from 'react-apollo'
import { getObjectWithIdFromArray } from '../../util/gqlObjectUtils'

const Composed = adopt({
  [GET_PROJECTS_ENDPOINT_NAME]: ({ render }) => (
    <Query query={GET_PROJECTS_QUERY}>{render}</Query>
  ),
  [DELETE_PROJECT_ENDPOINT_NAME]: ({ render }) => (
    <Mutation mutation={DELETE_PROJECT_MUTATION}>{render}</Mutation>
  ),
})

class ProjectsPage extends Component {
  state = {
    projectDashboardIdForModal: null,
    projectDashboardModalIsVisible: false,
    createProjectModalIsVisible: false,
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.location.key !== nextProps.location.key) {
  //     this.props.projectsQuery.refetch()
  //   }
  // }

  showProjectDashboardModal = () =>
    this.setState({ projectDashboardModalIsVisible: true })

  hideProjectDashboardModal = () =>
    this.setState({ projectDashboardModalIsVisible: false })

  handleProjectNameClick = projectId => {
    this.setState({ projectDashboardIdForModal: projectId })
    this.showProjectDashboardModal()
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

          const projectForProjectDashboard = getObjectWithIdFromArray(
            projects,
            this.state.projectDashboardIdForModal,
          )

          const refetchProjects = getRefetchFromReactAdoptProps({
            props,
            endpointName: GET_PROJECTS_ENDPOINT_NAME,
          })

          const handleDuplicateProject = projectId => {}

          const handleDeleteProject = async projectId => {
            await getMutationFromReactAdoptProps({
              props,
              endpointName: DELETE_PROJECT_ENDPOINT_NAME,
            })({
              variables: {
                id: projectId,
              },
            })
            await refetchProjects()
          }

          return (
            <Fragment>
              <Modal
                onCancel={() =>
                  this.setState({
                    projectDashboardModalIsVisible: false,
                    projectDashboardIdForModal: null,
                  })
                }
                width={620}
                visible={this.state.projectDashboardModalIsVisible}
                destroyOnClose
                footer={null}
              >
                <ProjectDashboard
                  onSuccess={async () => {
                    await this.hideProjectDashboardModal()
                    await refetchProjects()
                  }}
                  project={projectForProjectDashboard}
                />
              </Modal>
              <Modal
                onCancel={() =>
                  this.setState({
                    createProjectModalIsVisible: false,
                  })
                }
                width={620}
                visible={this.state.createProjectModalIsVisible}
                destroyOnClose
                footer={null}
              >
                <CreateProject
                  onSuccess={async () => {
                    await this.hideCreateProjectModal()
                    await refetchProjects()
                  }}
                />
              </Modal>
              <Flex mb={15} justifyContent="flex-end">
                <Button onClick={this.showCreateProjectModal}>
                  Create new project
                </Button>
              </Flex>
              <ProjectsTable
                handleProjectNameClick={this.handleProjectNameClick}
                projects={projects}
                handleDeleteProject={handleDeleteProject}
              />
            </Fragment>
          )
        }}
      </Composed>
    )
  }
}

export default ProjectsPage
