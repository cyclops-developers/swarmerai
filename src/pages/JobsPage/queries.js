import { gql } from 'apollo-boost'

// eslint-disable-next-line
export const GET_ACTIVE_JOBS = gql`
  query {
    getActiveJobs {
      id
      startDateTime
      endDateTime
      project {
        id
        name
        category
        creator {
          id
          name
        }
      }
    }
  }
`
