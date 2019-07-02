import React, { Fragment } from 'react';
import { JobsTable } from '../../modules/JobsTable';
import { H3 } from '../../helperModules/Texts';

export const AllJobsPageView = props => (
  <Fragment>
    <H3>All active jobs</H3>
    <JobsTable jobs={props.jobs} />
  </Fragment>
);
