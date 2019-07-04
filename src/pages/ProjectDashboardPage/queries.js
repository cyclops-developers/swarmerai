/*
 *  Copyright 2019 Laguro, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { gql } from 'apollo-boost';

export const PROJECT_ENDPOINT_NAME = 'project';

export const GET_PROJECT_QUERY = gql`
  query ${PROJECT_ENDPOINT_NAME}($id: ID!) {
    ${PROJECT_ENDPOINT_NAME}(id: $id) {
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
      jobs {
        id
        project {
          name
          creator {
            id
            name
          }
        }
        startDateTime
        category
        status
        taskCompleted
        expectedSubmissions
        topContributors {
          total
          userId
          user {
            id
            name
          }
        }
      }
      topContributors {
          total
          userId
          user {
            id
            name
          }
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

export const END_JOB_ENDPOINT_NAME = 'endJob';

export const END_JOB_MUTATION = gql`
  mutation ${END_JOB_ENDPOINT_NAME}($id: ID!) {
    ${END_JOB_ENDPOINT_NAME}(id: $id) {
      id
    }
  }
`;
