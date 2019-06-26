import { gql } from 'apollo-boost'

// eslint-disable-next-line
export const GET_NEXT_TASK = gql`
  query getNextTask($jobId: String!){
    getNextTask(jobId: $jobId) {
      id
      fileId
      job {
          id
          project {
              id
              category
              description
              name
              type
              question
              repeatable
              classes
              width
              height
          }
      }
    }
  }
`
