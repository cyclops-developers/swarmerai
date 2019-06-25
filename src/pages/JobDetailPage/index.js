import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import moment from 'moment'

import get from 'lodash/get'

import { GET_ACTIVE_JOBS } from './queries'

import { Text } from '../../components/Text'
import { Flex } from '../../components/Flex'

const JobDetailPage = ({ ...props }) => {
  const jobId = get(props, 'match.params.jobId')
  const { data: jobsData, error: jobsError } = useQuery(GET_ACTIVE_JOBS)
  const activeJobs = get(jobsData, 'getActiveJobs') || []

  if (jobsError) console.log('error loading job', jobsError)

  const selectedJob = activeJobs.find(job => job.id === jobId) || {}
  const project = get(selectedJob, 'project', {})

  return (
    <Flex flexDirection="column" p={20}>
      {project.category && (
        <Text fontSize={3}>{`Category: ${project.category}`}</Text>
      )}
      {selectedJob.startDateTime && (
        <Text fontSize={3}>{`Started: ${moment(
          selectedJob.startDateTime,
      ).format('MM/DD/YYYY')}`}</Text>
      )}
      {selectedJob.endDateTime && (
        <Text fontSize={3}>{`Ending: ${moment(
          selectedJob.endDateTime,
      ).format('MM/DD/YYYY')}`}</Text>
      )}
      {project.name && (
        <Text fontSize={2} mt={10}>
          {`Name: ${project.name}`}
        </Text>
      )}
      {project.description && (
        <Text fontSize={0} mb={10}>
          {`Description: ${project.description}`}
        </Text>
      )}
      {project.question && (
        <Text fontSize={3}>{`Question: ${project.question}`}</Text>
      )}
    </Flex>
  )
}

export default JobDetailPage
