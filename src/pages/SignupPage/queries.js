import gql from 'graphql-tag';

export const SIGNUP_ENDPOINT_NAME = 'signup';

export const SIGNUP_MUTATION = gql`
  mutation ${SIGNUP_ENDPOINT_NAME}($email: String!, $password: String!, $name: String!) {
    ${SIGNUP_ENDPOINT_NAME}(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
