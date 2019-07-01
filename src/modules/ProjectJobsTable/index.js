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
import React, { Fragment } from 'react'
import { Table, Button, Popconfirm, Progress } from 'antd'
import { moment } from '../../util/libraryUtils'
import { getColumnsWithFilterAndSorter } from '../../util/tableUtils'
import { Job } from '../../util/jobUtils'
import { Box } from '../../components/Box'
import { Text } from '../../components/Text'

const ID = 'id'
const PROJECT_NAME = 'projectName'
const DATE_STARTED = 'dateStarted'
const CATEGORY = 'category'
const CREATOR_NAME = 'creatorName'
const STATUS = 'status'

export const ProjectJobsTable = props => {
  const mappedJobs = props.jobs.map(job => ({
    [ID]: job.id,
    [PROJECT_NAME]: job.project.name,
    [DATE_STARTED]: moment(job.startDateTime).format('L'),
    [CATEGORY]: job.category,
    [CREATOR_NAME]: job.project.creator.name,
    [STATUS]: job.status,
  }))

  const columns = [
    {
      title: 'Project name',
      dataIndex: PROJECT_NAME,
    },
    {
      title: 'Date started',
      dataIndex: DATE_STARTED,
    },
    {
      title: 'Project category',
      dataIndex: CATEGORY,
    },

    {
      title: 'Project creator name',
      dataIndex: CREATOR_NAME,
    },
    {
      title: 'Stutus',
      dataIndex: STATUS,
    },
    {
      title: 'Actions',
      render: (_, jobItem) => {
        const job = new Job(jobItem)
        return (
          <Fragment>
            <Box mb={6}>
              <Button onClick={() => props.handleViewDetails(job.getId())}>
                View details
              </Button>
            </Box>
            {job.isActive() ? (
              <Popconfirm
                title="Are you sure you want to delete this project?"
                onConfirm={() => props.handleStopJob(job.getId())}
                okText="Yes"
                cancelText="No"
              >
                <Button>Stop</Button>
              </Popconfirm>
            ) : (
              <div />
            )}
          </Fragment>
        )
      },
      hasNoFilterOrSort: true,
    },
    {
      title: 'Progress',
      render: (_, jobItem) => {
        const job = new Job(jobItem)
        return (
          <Box>
            <Text>30 out of 150 tasks completed</Text>
            <Progress percent={job.getProgress() * 100} />
          </Box>
        )
      },
      hasNoFilterOrSort: true,
      width: 250,
    },
  ]

  const columnsWithFilterAndSorter = getColumnsWithFilterAndSorter({
    objects: mappedJobs,
    columns,
  })

  return (
    <Table
      pagination={false}
      columns={columnsWithFilterAndSorter}
      dataSource={mappedJobs}
    />
  )
}
