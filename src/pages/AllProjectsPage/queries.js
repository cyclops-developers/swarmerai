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
import gql from 'graphql-tag';

export const GET_PROJECTS_ENDPOINT_NAME = 'activeProjects';

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
`;

export const DELETE_PROJECT_ENDPOINT_NAME = 'deleteProject';

export const DELETE_PROJECT_MUTATION = gql`
  mutation ${DELETE_PROJECT_ENDPOINT_NAME}($id: ID!) {
   ${DELETE_PROJECT_ENDPOINT_NAME}(id: $id) {
     id
   }
  }
`;

export const DUPLICATE_PROJECT_ENDPOINT_NAME = 'duplicateProject';

export const DUPLICATE_PROJECT_MUTATION = gql`
  mutation ${DUPLICATE_PROJECT_ENDPOINT_NAME}($id: ID!) {
   ${DUPLICATE_PROJECT_ENDPOINT_NAME}(id: $id) {
     id
   }
  }
`;
