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
      bucketName
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

export const DUPLICATE_PROJECT_ENDPOINT_NAME = 'duplicateProject'

export const DUPLICATE_PROJECT_MUTATION = gql`
  mutation ${DUPLICATE_PROJECT_ENDPOINT_NAME}($id: ID!) {
   ${DUPLICATE_PROJECT_ENDPOINT_NAME}(id: $id) {
     id
   }
  }
`
