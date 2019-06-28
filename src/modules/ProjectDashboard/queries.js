import { gql } from 'apollo-boost'

export const GET_CATEGORIES_ENDPOINT_NAME = 'getCategories'

export const getCategoriesQuery = gql`
  query ${GET_CATEGORIES_ENDPOINT_NAME} {
    ${GET_CATEGORIES_ENDPOINT_NAME} {
      id
      name
    }
  }
`

export const START_PROJECT_ENDPOINT_NAME = 'startProject'

export const START_PROJECT_MUTATION = gql`
  mutation ${START_PROJECT_ENDPOINT_NAME}($id: ID!) {
   ${START_PROJECT_ENDPOINT_NAME}(id: $id)
  }
`
