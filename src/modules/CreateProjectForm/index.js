import React, { PureComponent } from 'react'
import { adopt } from 'react-adopt'
import { Mutation } from 'react-apollo'
import _get from 'lodash/get'
import { CREATE_PROJECT_ENDPOINT_NAME, createProjectMutation } from './queries'
import {
  CreateProjectFormView,
  NAME_FIELD_NAME,
  NUM_VALIDATION_FIELD_NAME,
  BUCKET_NAME_FIELD_NAME,
  DESCRIPTION_FIELD_NAME,
  CATEGORY_FIELD_NAME,
  LABEL_TYPE_FIELD_NAME,
  QUESTION_FIELD_NAME,
  IS_LABEL_REPEATABLE_FIELD_NAME,
  LABELS_FIELD_NAME,
} from './view'
import { Box } from '../../components/Box'
import { BINARY } from '../FieldComponents'

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

class CreateProjectForm extends PureComponent {
  render() {
    return (
      <Composed>
        {props => {
          const handleSubmit = async values => {
            // eslint-disable-next-line
            debugger
            console.log('1232', props)

            const imageDimensions = await getImageDimensions(
              values[BUCKET_NAME_FIELD_NAME],
            )
            _get(props, `${CREATE_PROJECT_ENDPOINT_NAME}`)({
              variables: {
                input: {
                  name: values[NAME_FIELD_NAME],
                  description: values[DESCRIPTION_FIELD_NAME],
                  validation: values[NUM_VALIDATION_FIELD_NAME],
                  bucketUrl: values[BUCKET_NAME_FIELD_NAME],
                  category: values[CATEGORY_FIELD_NAME],
                  type: values[LABEL_TYPE_FIELD_NAME],
                  repeatable: values[IS_LABEL_REPEATABLE_FIELD_NAME],
                  question: values[QUESTION_FIELD_NAME],
                  classes: values[LABELS_FIELD_NAME],
                  width: imageDimensions[0],
                  height: imageDimensions[1],
                },
              },
            })
          }

          return (
            <Box>
              <CreateProjectFormView data={{}} onSubmit={handleSubmit} />
            </Box>
          )
        }}
      </Composed>
    )
  }
}

export { CreateProjectForm }
