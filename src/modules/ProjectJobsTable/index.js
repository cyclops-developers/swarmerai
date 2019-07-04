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
import React from 'react';
import { Table, Button, Popconfirm, Progress, message } from 'antd';
import moment from 'moment';
import { getColumnsWithFilterAndSorter } from '../../util/tableUtils';
import { Job } from '../../util/jobUtils';
import { Box } from '../../components/Box';
import { Text } from '../../components/Text';
import { Flex } from '../../components/Flex';

const ID = 'id';
const PROJECT_NAME = 'projectName';
const DATE_STARTED = 'dateStarted';
const CATEGORY = 'category';
const CREATOR_NAME = 'creatorName';
const STATUS = 'status';
const PROGRESS = 'progress';

export const ProjectJobsTable = props => {
  const mappedJobs = props.jobs.map(job => ({
    ...job,
    [ID]: job.id,
    [PROJECT_NAME]: job.project.name,
    [DATE_STARTED]: moment(job.startDateTime).format('L'),
    [CATEGORY]: job.category,
    [CREATOR_NAME]: job.project.creator.name,
    [STATUS]: job.status,
    [PROGRESS]: job.taskCompleted / job.expectedSubmissions,
  }));

  const columns = [
    {
      title: 'Date started',
      dataIndex: DATE_STARTED,
    },
    {
      title: 'Status',
      dataIndex: STATUS,
    },
    {
      title: 'Progress',
      dataIndex: PROGRESS,
      render: (progress, job) => {
        const jobObject = new Job(job);
        return (
          <Box>
            <Text>{`${jobObject.getTaskCompleted()} out of ${jobObject.getExpectedSubmissions()} tasks completed`}</Text>
            <Progress percent={Math.round(progress * 100)} />
          </Box>
        );
      },
      hasNoFilterOrSort: true,
      width: 350,
    },
    {
      title: 'Actions',
      render: (_, jobItem) => {
        const job = new Job(jobItem);
        return (
          <Flex>
            <Box mr={6}>
              <Button
                icon="info-circle"
                onClick={() => props.handleViewDetails(job.getId())}
              ></Button>
            </Box>
            {job.isActive() ? (
              <Popconfirm
                title="Are you sure you want to end this job?"
                onConfirm={() =>
                  props.handleEndJob({
                    values: {
                      jobId: job.getId(),
                    },
                    onSuccess: () =>
                      message.success('Job was successfully stopped'),
                  })
                }
                okText="Yes"
                cancelText="No"
              >
                <Button
                  loading={props.getEndJobForProjectIsLoading(job.getId())}
                  icon="stop"
                  type="danger"
                ></Button>
              </Popconfirm>
            ) : (
              <div />
            )}
          </Flex>
        );
      },
      hasNoFilterOrSort: true,
    },
  ];

  const columnsWithFilterAndSorter = getColumnsWithFilterAndSorter({
    objects: mappedJobs,
    columns,
  });

  return (
    <Table
      pagination={false}
      columns={columnsWithFilterAndSorter}
      dataSource={mappedJobs}
    />
  );
};
