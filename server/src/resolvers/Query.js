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
import { getNextTask } from '../task';
import { getUserId } from '../utils';
import { getContributors } from '../utils/contributorUtils';

const Query = {
  projects(parent, args, context) {
    const id = getUserId(context);
    const where = {
      creator: {
        id,
      },
    };
    return context.prisma.projects({ where });
  },

  project(parent, { id }, context) {
    return context.prisma.project({ id });
  },

  me(parent, args, context) {
    const id = getUserId(context);
    return context.prisma.user({ id });
  },

  getCategories(parent, args, context) {
    return context.prisma.categories();
  },
  getJobs: async (parent, { projectId }, context) => {

    // Check user
    getUserId(context);

    // Get Project Id
    const where = {
      projectId,
    };
    return context.prisma.jobs({ where });
  },

  getActiveJobs(parent, args, context) {
    return context.prisma.jobs({ where: { status: 'ACTIVE' } });
  },

  getNextTask(parent, { jobId }, context) {
    return getNextTask(jobId);
  },

  getTopContributors: async (parent, { projectId, jobId, quantity }, context) => {
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
    return returnContributors.slice(0,quantity);
  },
};

module.exports = { Query };
