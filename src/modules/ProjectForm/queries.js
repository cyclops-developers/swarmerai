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
