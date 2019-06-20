import { gql } from 'apollo-boost'

export const CREATE_PROJECT_ENDPOINT_NAME = 'createProject'

export const createProjectMutation = gql`
  mutation ${CREATE_PROJECT_ENDPOINT_NAME}($input: ProjectCreateInput!) {
    ${CREATE_PROJECT_ENDPOINT_NAME}(input: $input) {
      id
    }
  }
`
