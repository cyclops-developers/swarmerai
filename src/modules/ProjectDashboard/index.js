import React, { Component, Fragment } from 'react'

import { Box } from '../../components/Box'
import { H2, P1, P1Strong } from '../../helperModules/Texts'
import { Flex } from '../../components/Flex'
import { Button } from 'antd'
import ProjectForm from '../ProjectForm'
import { adopt } from 'react-adopt'
import { GET_CATEGORIES_ENDPOINT_NAME, getCategoriesQuery } from './queries'
import { Query, Mutation } from 'react-apollo'
import {
  getComponentToRender,
  getMutationFromReactAdoptProps,
} from '../../util/gqlUtils'
import { Project, getProjectForForm } from '../../util/projectUtils'
import { START_PROJECT_ENDPOINT_NAME, START_PROJECT_MUTATION } from './queries'

const Composed = adopt({
  [GET_CATEGORIES_ENDPOINT_NAME]: ({ render }) => (
    <Query query={getCategoriesQuery}>{render}</Query>
  ),
  [START_PROJECT_ENDPOINT_NAME]: ({ render }) => (
    <Mutation mutation={START_PROJECT_MUTATION}>{render}</Mutation>
  ),
})

class ProjectDashboard extends Component {
  handleSubmit = () => {}

  render() {
    const projectForFormForProjectDashboard = getProjectForForm(
      this.props.project,
    )

    return (
      <Composed>
        {props => {
          const project = new Project(this.props.project)
          const projectHasCurrentJob = project.hasCurrentJob()

          const startProject = () => {
            getMutationFromReactAdoptProps({
              props,
              endpointName: START_PROJECT_ENDPOINT_NAME,
            })({
              variables: {
                id: project.getId(),
              },
            })
          }

          const componentOnSuccess = (
            <Box>
              <H2>{project.getName()}</H2>
              <Flex mb={10}>
                {projectHasCurrentJob && (
                  <Fragment>
                    <P1Strong mr={6}>Current job ID: </P1Strong>
                    <P1 mr={6}>{project.getCurrentJobId()}</P1>
                  </Fragment>
                )}
              </Flex>
              <Flex mb={28}>
                {!projectHasCurrentJob && (
                  <Box mr={6}>
                    <Button onClick={startProject}>Start job</Button>
                  </Box>
                )}
                {projectHasCurrentJob && (
                  <Button type="danger"> Stop job</Button>
                )}
              </Flex>
              <Box mb={15}>
                <ProjectForm
                  data={projectForFormForProjectDashboard}
                  onSubmit={this.handleSubmit}
                />
              </Box>
              <Flex justifyContent="center">
                <Button type="danger">Delete project</Button>
              </Flex>
            </Box>
          )

          return getComponentToRender({ props, componentOnSuccess })
        }}
      </Composed>
    )
  }
}

export default ProjectDashboard
