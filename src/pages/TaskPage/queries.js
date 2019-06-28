import { gql } from 'apollo-boost'

// eslint-disable-next-line
export const GET_NEXT_TASK = gql`
  query getNextTask($jobId: String!) {
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

export const SUBMIT_TASK = gql`
  mutation submitTask(
    $labels: [LabelInput]
    $jobId: String!
    $fileId: String!
  ) {
    submitTask(input: { labels: $labels, jobId: $jobId, fileId: $fileId }) {
      id
    }
  }
`
