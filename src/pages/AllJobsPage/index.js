import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import get from 'lodash/get';
import { ACTIVE_JOBS_QUERY } from './queries';
import moment from 'moment';
import { AllJobsPageView } from './view';

const AllJobsPage = () => {
  const { data: jobsData, error: jobsError } = useQuery(ACTIVE_JOBS_QUERY);
  const activeJobs = get(jobsData, 'activeJobs') || [];
  const parsedJobs = activeJobs.map(job => ({
    id: job.id,
    name: job.project.name,
    category: job.project.category,
    dateCreated: moment(job.startDateTime).format(),
    creator: job.project.creator,
  }));

  if (jobsError) console.log('error loading jobs', jobsError);

  return <AllJobsPageView jobs={parsedJobs} />;
};

export default AllJobsPage;
