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
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import moment from 'moment'

import get from 'lodash/get'

import history from '../../history'

import { GET_ACTIVE_JOBS } from './queries'

import { Button } from 'antd'
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
    <Flex p={20}>
      <Flex flexDirection="column" flex={3}>
        {project.category && (
          <Text fontSize={3}>{`Category: ${project.category}`}</Text>
        )}
        {selectedJob.startDateTime && (
          <Text fontSize={3}>{`Started: ${moment(
            selectedJob.startDateTime,
          ).format('MM/DD/YYYY')}`}</Text>
        )}
        {selectedJob.endDateTime && (
          <Text fontSize={3}>{`Ending: ${moment(selectedJob.endDateTime).format(
            'MM/DD/YYYY',
          )}`}</Text>
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
      <Flex flexDirection="column" flex={1} justifyContent="space-around">
        <Button onClick={() => {history.push('/jobs')}} style={{ height: '40px' }}>Return to job list</Button>
        <Button onClick={() => {history.push(`/task/${jobId}`)}} style={{ height: '40px' }}>Begin job</Button>
      </Flex>
    </Flex>
  )
}

export default JobDetailPage
