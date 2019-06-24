import React, { Component, Fragment } from 'react'
import { ProjectsTable } from '../modules/ProjectsTable'

class ProjectsPage extends Component {
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.location.key !== nextProps.location.key) {
  //     this.props.projectsQuery.refetch()
  //   }
  // }

  render() {
    return (
      <Fragment>
        <ProjectsTable />
      </Fragment>
    )
  }
}

export default ProjectsPage
