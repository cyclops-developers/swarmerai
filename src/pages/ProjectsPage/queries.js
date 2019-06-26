import gql from 'graphql-tag'

export const GET_PROJECTS_ENDPOINT_NAME = 'projects'

export const GET_PROJECTS_QUERY = gql`
  query ${GET_PROJECTS_ENDPOINT_NAME} {
   ${GET_PROJECTS_ENDPOINT_NAME} {
      id
      description
      name
      creator {
        name
      }
      category
      validation
      bucketUrl
      type
      repeatable
      question
      classes
      currentJob {
        id
      }
    }
  }
`

export const DELETE_PROJECT_ENDPOINT_NAME = 'deleteProject'

export const DELETE_PROJECT_MUTATION = gql`
  mutation ${DELETE_PROJECT_ENDPOINT_NAME}($id: ID!) {
   ${DELETE_PROJECT_ENDPOINT_NAME}(id: $id) {
     id
   }
  }
`
