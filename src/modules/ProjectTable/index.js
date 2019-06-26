import React from 'react'
import { ProjectTableView } from './view'

class ProjectTable extends React.Component {
  render() {
    return (
      <ProjectTableView
        projects={this.props.projects}
        handleProjectNameClick={this.props.handleProjectNameClick}
        handleDeleteProject={this.props.handleDeleteProject}
        handleDuplicateProject={this.props.handleDuplicateProject}
      />
    )
  }
}

export { ProjectTable }
