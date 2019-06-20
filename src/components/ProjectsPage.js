import React, { Component, Fragment } from 'react'
import Project from '../components/Project'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class ProjectsPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.projectsQuery.refetch()
    }
  }

  render() {
    if (this.props.projectsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <div className="flex justify-between items-center">
          <h1>Projects</h1>
        </div>
        {this.props.projectsQuery.projects &&
          this.props.projectsQuery.projects.map(project => (
            <Project
              key={project.id}
              project={project}
              refresh={() => this.props.projectsQuery.refetch()}
            />
          ))}
        {this.props.children}
      </Fragment>
    )
  }
}

const PROJECTS_QUERY = gql`
  query ProjectsQuery {
    projects {
      id
      description
      name
      creator {
        name
      }
    }
  }
`

export default graphql(PROJECTS_QUERY, {
  name: 'projectsQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(ProjectsPage)
