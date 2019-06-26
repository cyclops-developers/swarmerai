import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import get from 'lodash/get'

import { JobsTable } from '../../modules/JobsTable'
import { GET_ACTIVE_JOBS } from './queries'
import moment from 'moment'

const JobsPage = () => {
  const { data: jobsData, error: jobsError } = useQuery(GET_ACTIVE_JOBS)
  const activeJobs = get(jobsData, 'getActiveJobs') || []
  const parsedJobs = activeJobs.map(job => ({
    id: job.id,
    name: job.project.name,
    category: job.project.category,
    dateCreated: moment(job.startDateTime).format(),
    creator: job.project.creator,
  }))

  if (jobsError) console.log('error loading jobs', jobsError)

  return <JobsTable jobs={parsedJobs} />
}

export default JobsPage
