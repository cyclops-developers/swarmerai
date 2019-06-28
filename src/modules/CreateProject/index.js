import React, { PureComponent } from 'react'
import { adopt } from 'react-adopt'
import { Mutation } from 'react-apollo'
import _get from 'lodash/get'
import { CREATE_PROJECT_ENDPOINT_NAME, createProjectMutation } from './queries'
import {
  NAME_FIELD_NAME,
  NUM_VALIDATION_FIELD_NAME,
  BUCKET_NAME_FIELD_NAME,
  DESCRIPTION_FIELD_NAME,
  CATEGORY_FIELD_NAME,
  CLASSIFICATION_TYPE_FIELD_NAME,
  QUESTION_FIELD_NAME,
  IS_CLASS_REPEATABLE_FIELD_NAME,
  CLASSES_FIELD_NAME,
} from '../../util/projectUtils'
import { Box } from '../../components/Box'
import { H2 } from '../../helperModules/Texts'
import ProjectForm from '../ProjectForm'
import { execute } from '../../util/networkUtils'

const Composed = adopt({
  [CREATE_PROJECT_ENDPOINT_NAME]: ({ render }) => (
    <Mutation mutation={createProjectMutation}>{render}</Mutation>
  ),
})

const getImageDimensions = src => {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve([img.width, img.height])
    img.onerror = reject
    img.src = src
  })
}

class CreateProject extends PureComponent {
  render() {
    return (
      <Composed>
        {props => {
          const handleSubmit = async ({ values, onSuccess, onError }) => {
            const imageUrl = values[BUCKET_NAME_FIELD_NAME]
            const imageDimensions = await getImageDimensions(imageUrl)

            await execute({
              action: async () => {
                await _get(props, `${CREATE_PROJECT_ENDPOINT_NAME}`)({
                  variables: {
                    input: {
                      name: values[NAME_FIELD_NAME],
                      description: values[DESCRIPTION_FIELD_NAME],
                      validation: values[NUM_VALIDATION_FIELD_NAME],
                      bucketUrl: values[BUCKET_NAME_FIELD_NAME],
                      category: values[CATEGORY_FIELD_NAME],
                      type: values[CLASSIFICATION_TYPE_FIELD_NAME],
                      repeatable: values[IS_CLASS_REPEATABLE_FIELD_NAME],
                      question: values[QUESTION_FIELD_NAME],
                      classes: values[CLASSES_FIELD_NAME],
                      width: imageDimensions[0],
                      height: imageDimensions[1],
                    },
                  },
                })
                this.props.onSuccess()
                onSuccess()
              },
              onError,
            })
          }

          return (
            <Box>
              <H2>Create new project</H2>
              <ProjectForm data={{}} onSubmit={handleSubmit} />
            </Box>
          )
        }}
      </Composed>
    )
  }
}

export { CreateProject }
