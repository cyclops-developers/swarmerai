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

import { getContributors } from '../utils/contributorUtils';

const Project = {
  creator: ({ id }, args, context) => {
    return context.prisma.project({ id }).creator();
  },
  currentJob: async ({ id }, args, context) => {
    const project = await context.prisma.project({ id });
    if (project) {
      const current = await context.prisma.jobs({
        where: { projectId:id },
        orderBy: 'startDateTime_DESC',
      });
      if (current) {
        return current[0];
      }
    }
    return null;
  },
  
  topContributors: async ({ id }, args, context) => {
    // Get jobs based in the project id
    const where = {
      projectId: id,
    };

    const jobs = await context.prisma.jobs({ where });

    // if no jobs for that id
    if (!jobs || jobs.length === 0) {
      return null;
    }

    // Get Contributors
    const returnContributors = await getContributors(context, jobs);
    const quantity = 5;
    return returnContributors.slice(0,quantity);
  },
};

module.exports = {
  Project,
};
