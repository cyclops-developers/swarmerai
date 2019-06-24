import React from 'react'
import { ProjectFormView } from './view'
import { adopt } from 'react-adopt'
import { GET_CATEGORIES_ENDPOINT_NAME, getCategoriesQuery } from './queries'
import { Query } from 'react-apollo'
import {
  getComponentToRender,
  getDataFromReactAdoptProps,
} from '../../util/gqlUtils'

const Composed = adopt({
  [GET_CATEGORIES_ENDPOINT_NAME]: ({ render }) => (
    <Query query={getCategoriesQuery}>{render}</Query>
  ),
})

class ProjectForm extends React.Component {
  render() {
    return (
      <Composed>
        {props => {
          const categories =
            getDataFromReactAdoptProps({
              props,
              endpointName: GET_CATEGORIES_ENDPOINT_NAME,
            }) || []

          const componentOnSuccess = (
            <ProjectFormView
              {...this.props}
              categories={categories.map(category => category.name)}
            />
          )
          return getComponentToRender({ props, componentOnSuccess })
        }}
      </Composed>
    )
  }
}

export default ProjectForm
