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
import { useQuery } from 'react-apollo-hooks';
import get from 'lodash/get';
import { ACTIVE_JOBS_QUERY } from './queries';
import { JobDetailPageView } from './view';

const JobDetailPage = ({ ...props }) => {
  const jobId = get(props, 'match.params.jobId');
  const { data: jobsData, error: jobsError } = useQuery(ACTIVE_JOBS_QUERY);
  const activeJobs = get(jobsData, 'activeJobs') || [];

  if (jobsError) console.log('error loading job', jobsError);

  const selectedJob = activeJobs.find(job => job.id === jobId) || {};
  const project = get(selectedJob, 'project', {});

  return (
    <JobDetailPageView
      project={project}
      selectedJob={selectedJob}
      jobId={jobId}
    />
  );
};

export default JobDetailPage;
