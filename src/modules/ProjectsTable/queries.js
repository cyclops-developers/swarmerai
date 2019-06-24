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
    }
  }
`
