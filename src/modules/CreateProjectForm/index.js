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

// const getImageDimensions = src => {
//   return new Promise((resolve, reject) => {
//     let img = new Image()
//     img.onload = () => resolve([img.width, img.height])
//     img.onerror = reject
//     img.src = src
//   })
// }

class CreateProjectForm extends PureComponent {
  handleSubmit = async values => {
    alert(JSON.stringify(values))
  }
  render() {
    return (
      <Composed>
        {({ CREATE_PROJECT_ENDPOINT_NAME }) => {
          return (
            <Box>
              <CreateProjectFormView data={{}} onSubmit={this.handleSubmit} />
            </Box>
          )
        }}
      </Composed>
    )
  }
}

export { CreateProjectForm }
