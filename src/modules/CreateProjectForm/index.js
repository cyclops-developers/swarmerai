import React, { PureComponent } from 'react'
import { adopt } from 'react-adopt'
import { Mutation } from 'react-apollo'
import { CREATE_PROJECT_ENDPOINT_NAME, createProjectMutation } from './queries'
import { CreateProjectFormView } from './view'
import { Box } from '../../components/Box'

const Composed = adopt({
  [CREATE_PROJECT_ENDPOINT_NAME]: ({ render }) => (
    <Mutation mutation={createProjectMutation}>{render}</Mutation>
  ),
})

class CreateProjectForm extends PureComponent {
  render() {
    return (
      <Composed>
        {({ CREATE_PROJECT_ENDPOINT_NAME }) => {
          return (
            <Box>
              <CreateProjectFormView data={{ availabilityList: [] }} />
            </Box>
          )
        }}
      </Composed>
    )
  }
}

export { CreateProjectForm }
