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
import { Flex } from '../../components/Flex';
import moment from 'moment';
import { Button } from 'antd';
import { Link } from '../../components/Link';
import {
  ALL_JOBS_PAGE_URL,
  getUrlWithId,
  TASK_PAGE_URL_PREFIX,
} from '../../strings/urlStrings';
import { H3 } from '../../helperModules/Texts';
import { Box } from '../../components/Box';
import { Details } from '../../modules/Details';

export const JobDetailPageView = props => (
  <Flex p={20}>
    <Flex flexDirection="column" flex={3} mr={15}>
      <H3>{`Project: ${props.project.name}`}</H3>
      <Details
        data={[
          {
            text: 'Started',
            data: moment(props.selectedJob.startDateTime).format('MM/DD/YYYY'),
          },
          { text: 'Category', data: props.project.category },
          {
            text: 'Ending',
            data: moment(props.selectedJob.endDateTime).format('MM/DD/YYYY'),
          },
          { text: 'Description', data: props.project.description },
          { text: 'Question', data: props.project.question },
        ]}
      />
    </Flex>
    <Box>
      <Box mb={15}>
        <Link to={ALL_JOBS_PAGE_URL}>
          <Button>Return to job list</Button>
        </Link>
      </Box>
      <Box mb={15}>
        <Link
          to={getUrlWithId({ prefix: TASK_PAGE_URL_PREFIX, id: props.jobId })}
        >
          <Button>Begin job</Button>
        </Link>
      </Box>
    </Box>
  </Flex>
);
