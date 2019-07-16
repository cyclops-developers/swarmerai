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
import _isEmpty from 'lodash/isEmpty';

import { getNextTask } from '../task';
import { getUserId } from '../utils';
import { getContributors } from '../utils/contributorUtils';
import { listBucket } from '../utils/bucketUtils';

const Query = {
  projects(_parent, args, context) {
    const id = getUserId(context);
    const where = {
      creator: {
        id,
      },
    };
    return context.prisma.projects({ where });
  },

  project(_parent, { id }, context) {
    return context.prisma.project({ id });
  },

  activeProjects(_parent, args, context) {
    const id = getUserId(context);
    const where = {
      creator: {
        id,
      },
      status_not: 'DELETED',
    };
    return context.prisma.projects({ where });
  },

  me(_parent, args, context) {
    const id = getUserId(context);
    return context.prisma.user({ id });
  },

  categories(_parent, args, context) {
    return context.prisma.categories();
  },

  jobs: async (_parent, { projectId, onlyActive }, context) => {
    // Check user
    getUserId(context);

    // Get Project Id
    const where = {
      projectId,
    };

    if (onlyActive) {
      where.status = 'ACTIVE';
    }

    return context.prisma.jobs({ where });
  },

  activeJobs(_parent, args, context) {
    return context.prisma.jobs({ where: { status: 'ACTIVE' } });
  },

  nextTask(_parent, { jobId }, context) {
    return getNextTask(jobId);
  },

  topContributors: async (_parent, { projectId, jobId, quantity }, context) => {
    // Get jobs based in the project id
    const where = {
      projectId,
    };

    // Check job ib
    if (jobId) {
      where.id = jobId;
    }

    const jobs = await context.prisma.jobs({ where });

    // if no jobs for that id
    if (!jobs || jobs.length === 0) {
      return null;
    }

    // Get Contributors
    const returnContributors = await getContributors(context, jobs);
    return returnContributors.slice(0, quantity);
  },

  imageUrls: async (_, { bucketName }) => {
    try {
      const imageUrls = await listBucket(bucketName);

      if (_isEmpty(imageUrls)) {
        return [];
      }

      return imageUrls;
    } catch (error) {
      throw new Error('Error getting images');
    }
  },
};

module.exports = { Query };
