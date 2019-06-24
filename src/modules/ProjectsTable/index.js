import React from 'react'
import { ProjectsTableView } from './view'
import { adopt } from 'react-adopt'
import {
  GET_PROJECTS_ENDPOINT_NAME,
  GET_PROJECTS_QUERY,
  DELETE_PROJECT_ENDPOINT_NAME,
  DELETE_PROJECT_MUTATION,
} from './queries'
import { Query, Mutation } from 'react-apollo'
import {
  getDataFromReactAdoptProps,
  getIsLoadingFromReactAdoptProps,
  getMutationFromReactAdoptProps,
  getRefetchFromReactAdoptProps,
} from '../../util/gqlUtils'

// const Composed = adopt({
// [GET_PROJECTS_ENDPOINT_NAME]: ({ render }) => (
//   <Query query={GET_PROJECTS_QUERY}>{render}</Query>
// ),
// [DELETE_PROJECT_ENDPOINT_NAME]: ({ render }) => (
//   <Mutation mutation={DELETE_PROJECT_MUTATION}>{render}</Mutation>
// ),
// })

class ProjectsTable extends React.Component {
  render() {
    // <Composed>
    // {props => {
    // if (
    //   getIsLoadingFromReactAdoptProps({
    //     props,
    //     endpointName: GET_PROJECTS_ENDPOINT_NAME,
    //   })
    // ) {
    //   return <div />
    // }

    // const refetchProjects = getRefetchFromReactAdoptProps({
    //   props,
    //   endpointName: GET_PROJECTS_ENDPOINT_NAME,
    // })

    return (
      <ProjectsTableView
        projects={this.props.projects}
        handleProjectNameClick={this.props.handleProjectNameClick}
        handleDeleteProject={this.props.handleDeleteProject}
      />
    )
    // }}
    // </Composed>
  }
}

export { ProjectsTable }
