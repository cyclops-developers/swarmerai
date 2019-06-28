import gql from 'graphql-tag'

export const LOGIN_ENDPOINT_NAME = 'login'

export const LOGIN_MUTATION = gql`
  mutation ${LOGIN_ENDPOINT_NAME}($email: String!, $password: String!) {
    ${LOGIN_ENDPOINT_NAME}(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`
