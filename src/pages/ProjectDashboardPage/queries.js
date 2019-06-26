import { gql } from 'apollo-boost';

export const GET_PROJECT_ENDPOINT_NAME = 'project';

export const GET_PROJECT_QUERY = gql`
  query ${GET_PROJECT_ENDPOINT_NAME}($id: ID!) {
    ${GET_PROJECT_ENDPOINT_NAME}(id: $id) {
      id
      description
      name
      creator {
        name
      }
      category
      createdAt
      validation
      width
      height
      bucketName
      question
      type
      classes
      repeatable
      currentJob {
        id
      }
    }
  }
`;

export const UPDATE_PROJECT_ENDPOINT_NAME = 'updateProject';

export const UPDATE_PROJECT_MUTATION = gql`
  mutation ${UPDATE_PROJECT_ENDPOINT_NAME}($input: UpdateProjectInput!) {
    ${UPDATE_PROJECT_ENDPOINT_NAME}(input: $input) {
      id
    }
  }
`;

export const START_PROJECT_ENDPOINT_NAME = 'startProject';

export const START_PROJECT_MUTATION = gql`
  mutation ${START_PROJECT_ENDPOINT_NAME}($id: ID!) {
    ${START_PROJECT_ENDPOINT_NAME}(id: $id)
  }
`;
